import usersController from "../controllers/user.controller.js";
import {uploader} from '../utils/multer.js';

import Router from "./router.js";

export default class viewRoutes extends Router {
    init() {

        //ENVIO DE MAIL CON RECUPERACION DE CONTRASEÑA
        this.get("/recoverPassword/",["PUBLIC"], usersController.sendRecoverByEmail)
        //ENVIO DE MAIL CON RECUPERACION DE CONTRASEÑA
        this.get("/recoverPassword/:id",["PUBLIC"], usersController.sendRecoverByEmail)
        //USO CODIGO DE RECUPERACION DEL USUARIO Y CONTROLO QUE NO EXCEDA EL TIEMPO DE RECUPERACION DE CONTRASEÑA
        this.get("/changePassword/:id",["PUBLIC"], usersController.changePassword)
        //CONTROLO QUE LA NUEVA CONTRASEÑA DEL USUARIO NO SEA IGUAL A LA ANTIGUA CONTRASEÑA
        this.put("/comparePassword/",["PUBLIC"], usersController.comparePassword)



        //SUBIDA DE ARCHIVOS NECESARIOS PARA PODER SER PREMIUM
        this.post("/:id/documents/",["USER"], uploader.array('files'), (req, res) => {
            //HABILITAR UNA VEZ FINALIZADA LA LOGICA
            if(!req.session.user) return res.redirect("/login")
            res.json({finishUpload:true})
        })

        //CAMBIO DE ROLE DEL USUARIO SI TODOS LOS PARAMETROS SON CORRECTOS
        this.get("/premium/:id",["USER"], usersController.checkDocumentsForPremium)

        //CREO LISTA DE TODOS LOS USUARIO SOLO PARA VISTA
        this.get("/",["USER","PREMIUM","PUBLIC"], usersController.getAllUsers)

        //CAMBIO DE ROLE DEL USUARIO SI EL ADMIN LO DESEA
        this.put("/changeRole/:id",['ADMIN'], usersController.changeRole)

        //BORRO USUARIO MEDIANTE ID
        this.delete("/delete/:id",['ADMIN'], usersController.deleteUser)

        //BORRO USUARIOS SIN CONEXION EN LAS ULTIMAS 2H
        this.delete("/oldUsers",['ADMIN'], usersController.deleteOldUsers)

        //ACTUALIZAR CHAT
        this.put("/chat",['USER',"PREMIUM", 'ADMIN'],usersController.updateLiveChat)

        //CONSEGUIR CHAT DEL DIA
        this.get("/chat/:chatId",['USER',"PREMIUM", 'ADMIN'],usersController.getActualChat)

    }
}