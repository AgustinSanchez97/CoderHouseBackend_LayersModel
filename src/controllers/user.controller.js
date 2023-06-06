
import usersDao from "../daos/classes/users.dao.js";
import sendMail from "../utils/sendMail.js";

import { hashPassword,comparePassword } from "../utils.js";


import {uploader} from '../utils/multer.js';

//import userValidator from "../validators/products.validator.js";



class usersController {
    async getAllUsers(req,res)
    {
        try{
            let allUsers = await usersDao.getAll()
        }
        catch(error){
            console.log(error)
        }
    }

    //PRIMER PASO
    async recoverByEmail(req,res)
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
                    const newLink = `http://localhost:8080/user/changePassword/${data.restoreCode}`
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
                    console.log(timePast)
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


    async getUserId(req,res)
    {
        if(!req.session.user) return res.redirect("/login")
        const user = await usersDao.getByEmail(req.session.user.email)
        const userId = user[0].id
        res.render("profileUploadFiles",{userId:userId})
    }

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
}

export default new usersController()