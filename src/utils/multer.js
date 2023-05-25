import multer from 'multer'
import path, { extname, join } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imageTypes= ["image/png","image/jpg"]

const pdfTypes= ["document/pdf"]


const profileImageUpload = multer({
    dest: join(__dirname,`../uploads/profile`),
    fileFilter:(req,file,callback)=>{
        if(imageTypes.includes(file.mimetype)) callback(null, true)
        else callback(new error(`Only ${imageTypes.join("")} formats are allowed`))
    },
    limits:{
        fieldSize: 10000000,
    },
})


const profileDocumentsUpload = multer({
    storage: multer.diskStorage({
        //destination: join(__dirname,`../uploads/profile`),
        filename: (req,file,callback) => {
            const fileExtension = extname(file.originalname)
            const filename = file.originalname.split(fileExtension)[0]
            
            console.log(fileExtension)
            console.log(filename)


        }

    }),
    //dest: join(__dirname,`../uploads/profile`),
    /*
    fileFilter:(req,file,callback)=>{
        if(pdfTypes.includes(file.mimetype)) callback(null, true)
        else callback(new error(`Only ${pdfTypes.join("")} formats are allowed`))
    },
    limits:{
        fileSize: 10000000,
    },*/
})


const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, `./upload`)
  },
  filename: function(req, file, callback){
    callback(null, `${Date.now()}-${file.originalname}`)
  }
})

export const uploader = multer({ storage,profileDocumentsUpload,profileImageUpload })