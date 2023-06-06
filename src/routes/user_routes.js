import { Router } from "express";
import usersController from "../controllers/user.controller.js";


import {uploader} from '../utils/multer.js';


const router = Router()

//RECUPERACION DE CONTRASEÑA

router.get("/recoverPassword/", usersController.recoverByEmail)

router.get("/recoverPassword/:id", usersController.recoverByEmail)

router.get("/changePassword/:id", usersController.changePassword)

router.put("/comparePassword/", usersController.comparePassword)


//router.post("/:id/documents/", usersController.uploadDocuments)

router.post("/:id/documents/", uploader.array('files'), (req, res) => {
    //PONER UNA VEZ FINALIZADA LA LOGICA
    //if(!req.session.user) return res.redirect("/login")
    
    
    //console.log(req.file)
    //console.log(req.files)
    res.json({finishUpload:true})
})

router.get("/premium/:id", usersController.checkDocumentsForPremium)

//router.get("/premium/:id", usersController.checkDocumentsForPremium)


export default router