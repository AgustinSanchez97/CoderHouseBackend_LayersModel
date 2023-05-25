import { Router } from "express";
import usersController from "../controllers/user.controller.js";




const router = Router()

//RECUPERACION DE CONTRASEÑA

router.get("/recoverPassword/", usersController.recoverByEmail)

router.get("/recoverPassword/:id", usersController.recoverByEmail)

router.get("/changePassword/:id", usersController.changePassword)

router.put("/comparePassword/", usersController.comparePassword)


router.post("/:id/documents/", usersController.uploadDocuments)


export default router