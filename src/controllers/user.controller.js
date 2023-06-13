
import usersDao from "../daos/classes/users.dao.js";
import sendMail from "../utils/sendMail.js";
import __dirname, { hashPassword,comparePassword,} from "../utils.js";
import ticketDao from "../daos/classes/ticket.dao.js";

import chatDao from "../daos/classes/chat.dao.js";

class usersController {
    //RENDERIZADO DE TODOS LOS USUARIOS
    async getAllUsers(req,res)
    {
        //if(!req.session.user) return res.redirect("/login")
        try{
            let allUsers = await usersDao.getAll()
            res.render("users",{
                title:"Users",users:allUsers
            })
        }
        catch(error){
            console.log(error)
        }
    }
    //RENDERIZADO DE TODOS LOS USUARIOS PARA ADMINISTRADORES
    async getAllUsersAdmin(req,res)
    {
        try{
            let allUsers = await usersDao.getAll()
            res.render("usersAdmin",{
                title:"UsersAdmin",users:allUsers,user:req.session.user
            })
        }
        catch(error){
            console.log(error)
        }
    }
    //BORRAR USUARIO
    async deleteUser(req,res)
    {
        try{            
            const user = await usersDao.delete(req.params.id)
            res.json(user)
        }
        catch(error){
            console.log(error)
        }
    }
    //CAMBIAR ROLE
    async changeRole(req,res)
    {        
        try
        {
            const user = await usersDao.update(req.params.id,req.body)
            res.json(user)
        }
        catch(error){
            console.log(error)
        }
    }

    //RECUPERACION DE CONTRASEÑA
    //PRIMER PASO
    async sendRecoverByEmail(req,res)
    {
        try{
            let userExist = false
            let firstTry = true
            
            if(req.params.id != undefined)
            {
                firstTry = false
                const user = await usersDao.getByEmail(req.params.id)
                if(Object.keys(user).length != 0) userExist = true
                
                if(userExist == true)
                {
                    //CODE
                    user[0].restoreCode = Math.random().toString(36).substring(2, 12)
                    //DATE BUY
                    const data = {                        
                        restoreCode : Math.random().toString(36).substring(2, 12),
                        restoreDate : new Date()
                    }
                    //const newLink = `http://localhost:8080/api/users/changePassword/${data.restoreCode}`
                    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
                    const newLink = `${fullUrl}api/users/changePassword/${data.restoreCode}`
                    await sendMail.sendMailSimple(user[0].email,"Restore Password",`Enter the link to change the password! ${newLink}`)
                    usersDao.update(user[0].id,data)
                }
                res.render("recoverPassword", {title:"recoverPassword",userExist,firstTry})

            }
            else
            {
                res.render("recoverPassword", {title:"recoverPassword",userExist,firstTry})
            }

            
        }
        catch(error){
            console.log(error)
        }
    }

    //SEGUNDO PASO
    async changePassword(req,res)
    {
        try{
           let codeIsValid = true
            
            if(req.params.id != undefined)
            {
                let userExist = false
                const user = await usersDao.getByRecoverCode(req.params.id)
                
                if(Object.keys(user).length != 0) userExist = true
                
                if(userExist == true)
                {
                    //DATE
                    let timePast = ( new Date() - user[0].restoreDate)/ (1000 * 60)                    
                    if(timePast > 60) codeIsValid = false

                    //CODE
                    const code = user[0].restoreCode

                    res.render("changePassword", {title:"changePassword",userExist,codeIsValid,code})

                }
            }
        }
        catch(error){
            console.log(error)
        }
    }

    //TERCER PASO
    async comparePassword(req,res)
    {
        try{

            const user = await usersDao.getByRecoverCode(req.body.code)
            const passwordNew = req.body.password          
              
            if(comparePassword(user[0],passwordNew)) return res.json({validPassword:false})

            const data = {                        
                password:hashPassword(passwordNew)
            }

            await usersDao.update(user[0].id,data)
            res.json({validPassword:true})
        }
        catch(error){
            console.log(error)
        }
    }

    //RENDERIZADO DE DOCUMENTOS
    async renderToUploadFiles(req,res)
    {
        if(!req.session.user) return res.redirect("/login")
        const user = await usersDao.getByEmail(req.session.user.email)
        const userId = user[0].id
        res.render("profileUploadFiles",{userId:userId})
    }

    //GUARDADO DE LAS REFERENCIAS DE LOS DOCUEMENTOS GUARDADOS DE FORMA LOCAL
    async referenceToDocumentsUploaded(req,fileName,reference,res)
    {
        try
        {
            if(!req.session.user) return res.redirect("/login")
            let user = await usersDao.getByEmail(req.session.user.email)
            

            if(user[0].documents.length >= 3) 
            {
                await usersDao.deleteDocuments(user[0].id)
                user = await usersDao.getByEmail(req.session.user.email)

            }

            if(user[0].documents.length < 3)
            {                
                const data={
                    fileName:fileName,
                    reference:reference
                }            
                await usersDao.createDocuments(user[0].id,data)
            }
        }

        catch(error){
            console.log(error)
        }
    }
    
    //CONTROL DE QUE LAS RUTAS DE GUARDADO LOCAL EXISTAN
    async checkDocumentsForPremium(req,res)
    {
        try
        {            
            if(!req.session.user) return res.redirect("/login")
            const user = await usersDao.getByEmail(req.session.user.email)            
            let validPremium = false
            if(user[0].documents.length == 3) validPremium = true
            if(user[0].role == "user" && validPremium) await usersDao.update(user[0].id,{role:"premium"})
            
            res.render("premiumCheck",{validPremium:validPremium})
        }

        catch(error){
            console.log(error)
        }
    }

    //OBTENER TODOS LOS TICKETS DE UN USUARIO
    async renderAllTicketsForUser(req,res)
    {
        try
        {            
            const tickets = await ticketDao.getEmail(req.session.user.email)            
            res.render("profile",{user:req.session.user,tickets})            
        }
        catch (error) 
        {
            res.status(500).json({ error: error.message })
        }    
    }

    //BORRADO DE TODOS LOS USUARIOS QUE NO HAYAN TENIDO CONEXION EN LOS ULTIMOS 2 DIAS
    async deleteOldUsers(req,res)
    {
        try{
            let allUsers = await usersDao.getAll()
            
            for (let index = 0; index < allUsers.length; index++) 
            {
                const element = allUsers[index];                
                //DATE(segundos*minutos)/24h de un dia)
                const timePast = ( new Date() - new Date(element.last_connection))/ ((1000 * 60)*60) /24                
                
                //delete by users id. Todos los usuarios que no tengan fecha o que pase los 2 dias
                if(timePast > 2)
                {
                    await usersDao.delete(element.id)
                    await sendMail.sendMailSimple(element.email,"Deleted Account",`Su cuenta a sido eliminada por estar inactiva por mas de 2 dias!`)
                } 
                else if(isNaN(timePast)) await usersDao.delete(element.id)
            }
            res.json({allUsers})
        }
        catch(error){
            console.log(error)
        }
    }

    //RENDER CHAT
    async liveChat(req,res)
    {
        try{            
            //DIA ACTUAL
            const actualDate = getDate(new Date())
            
            //BUSCO SI EXISTE UN CHAT CON FECHA DEL DIA
            let actualChat = await chatDao.getByDate(actualDate)
            
            //CHAT ACTUAL SINO EXISTE LO CREO
            if(actualChat.length == 0) actualChat = await chatDao.create({chatDate:actualDate})
            const chatId = actualChat[0].id
            console.log(chatId)
            
            //SI FUERA PUBLICO EL CHAT ESTARIA ASI, PERO ES NECESARIO LOGGEARSE PARA USARLO
            let name = ""
            if(req.session.user)
            {
                 name = `${req.session.user.first_name} ${req.session.user.last_name}`
            }
            
            res.render("liveChat",{title:"LiveChat", chatId, name})
        }
        catch(error){
            console.log(error)
        }
    }

    //UPDATE CHAT
    async updateLiveChat(req,res)
    {
        try{        
            const chat = await chatDao.getById(req.body.chatId)            
            const messages = chat.messages
            const newMessage = {
                user: req.body.user,
                message: req.body.message
            }
            messages.push(newMessage)            
            chatDao.update(req.body.chatId,{messages})
            res.json({messages})
            
        }
        catch(error){
            console.log(error)
        }
    }
    

    //GET CHAT
    async getActualChat(req,res)
    {
        try{
            const chat = await chatDao.getById(req.params.chatId)            
            const messages = chat.messages

            res.json({messages})

        }
        catch(error){
            console.log(error)
        }
    }
}

//FUNCION PARA OBTENER FECHA SOLO CON AÑO, MES Y DIA
function getDate(dateInput)
{
    const year = dateInput.getUTCFullYear();
    const month = dateInput.getUTCMonth() + 1; //months from 1-12
    const day = dateInput.getUTCDate();
    
    const newdate = year + "-" + month + "-" + day;
    return newdate
}

export default new usersController()