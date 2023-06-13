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
        mongoUrl:"mongodb+srv://coder:coder123@coderhousehosting.xowlbyk.mongodb.net/ecommerce?retryWrites=true&w=majority",
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


mongoose.set("strictQuery",true)
mongoose.connect("mongodb+srv://coder:coder123@coderhousehosting.xowlbyk.mongodb.net/ecommerce?retryWrites=true&w=majority",{
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

app.listen(config.port,() => {console.log("Escuchando en el puerto 8080")})