import multer from 'multer'
import path, { extname, join } from "path"
import { fileURLToPath } from "url"

import fs from "fs"

import usersController from "../controllers/user.controller.js";

/*
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const imageTypes= ["image/png","image/jpg"]*/

const profileDocumentsUpload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, callback){
            //FOLDER RESET
            const dir =`./src/uploads/documents/${req.user.id}`
            //DELETE FOLDER SI ESTA COMPLETO
            if(fs.existsSync(dir) && fs.readdirSync(dir).length == 3) fs.rmSync(dir,{ recursive: true})
            //CREAR CARPETA SI NO EXISTE O SI SE BORRO PARA REINICIARSE
            if(!fs.existsSync(dir)) fs.mkdirSync(dir)            

            callback(null, dir)
        },
        filename: (req,file,callback) => {
            const fileExtension = extname(file.originalname)
            
            //NAME FILES COMPOSITION
            let name
            if(req.files.length == 1) name = "userIdentification"
            else if (req.files.length == 2) name = "userAdress"
            else if (req.files.length == 3) name = "userAccountState"
            
            const fileRute = `${req.user.id}-${name}${fileExtension}`            
            const reference = `./src/uploads/documents/${req.user.id}/${fileRute}`
            const fileName = `${req.user.id}-${name}`
            
            usersController.referenceToDocumentsUploaded(req,fileName,reference)

            callback(null,fileRute)
        }

    }),
    /*
    fileFilter:(req,file,callback)=>{
        if(pdfTypes.includes(file.mimetype)) callback(null, true)
        else callback(new error(`Only ${pdfTypes.join("")} formats are allowed`))
    },
    limits:{
        fileSize: 10000000,
    },*/
})


export const uploader = profileDocumentsUpload