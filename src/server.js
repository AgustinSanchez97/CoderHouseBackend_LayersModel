import express, { query } from "express";
import handlebars from "express-handlebars"
import __dirname from "./utils.js"

import router from "./routes/index.routes.js";

import mongoose from "mongoose";
import Handlebars from "handlebars";
import {allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access"
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import initializePassport from "./config/passportConfig.js";
import passport from "passport";

import config from "./config/config.js";
//import { addLogger } from "./utils/logger.js";

const app = express();

app.set("view engine","hbs")
app.set("views",`${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
//SUBIR EL MAXIMO DE MEGAS PARA DOCUMENTOS
app.use(express.urlencoded({extended: true,}))
app.use(cookieParser())



app.use(session({
    store: MongoStore.create({
        //mongoUrl:config.mongo_uri,
        mongoUrl:process.env.MONGO_URI,
        mongoOptions: {
            useNewUrlParser:true,
            useUnifiedTopology:true
        },
        ttl: 60

    }), 

    secret:"coderhouse",
    resave:false,
    saveUninitialized:false
}))

//mongoose.connect(config.mongo_uri,{

mongoose.set("strictQuery",true)
mongoose.connect(process.env.MONGO_URI,{

    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("DB is connected"))
.catch((error)=> console.error(error))


//PASSPORT
initializePassport()
app.use(passport.initialize())
app.use(passport.session())



//HANDLEBARS
app.engine("hbs", handlebars.engine(
    {
        extname: "hbs",
        defaultLayout: "main.hbs",
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }
))

//Routers
app.use("/", router)

import swaggerDocs from "./utils/swagger.js"

app.use("/api/docs", swaggerDocs)
const port = process.env.PORT || 8080
//const port = config.port || 8080

app.listen(port,() => {console.log("Escuchando en el puerto 8080")})