import passport, { Passport } from "passport";
import local from "passport-local"
import { userModel } from "../daos/models/user.model.js"
import { hashPassword,comparePassword } from "../utils.js";
import GitHubStrategy from "passport-github2"

import jwt, { ExtractJwt } from "passport-jwt"

import cartsDao from "../daos/classes/carts.dao.js"
import sendMail from "../utils/sendMail.js";

import userRepository from "../repositories/user.repository.js"



const jwtStrategy = jwt.Strategy

const extractJWT = jwt.ExtractJwt

const localStrategy= local.Strategy

const initializePassport = () =>{

    const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) token = req.cookies["token"]
    
    return token
}

    passport.use("jwt",new jwtStrategy({
        jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "coderSecret"
    },
    async (jwt_payload, done) => {
            try 
                {
                    done(null,jwt_payload)
                } 
            catch(error)
                {
                    done(error)
                }
            }
        )
    );


    passport.use(
        "register",
        new localStrategy(
            {
                usernameField: "email",
                passReqToCallback: true,
            }, async(req,username,password,done) =>{
                const {first_name, last_name,email, age,role} = req.body

                let cartID = await cartsDao.create()
                cartID = cartID.id
                

                if(!first_name|| !last_name|| !email|| !age|| !password) return done("All field are required", null)

                
                try{
                    const user = await userModel.findOne({email:username})
                    if(user) return done(null, false)

                    const newUser = await userRepository.createUser({
                        first_name,
                        last_name,
                        email,
                        age,
                        password: hashPassword(password),
                        role,
                        cart:cartID,
                        restoreCode:Math.random().toString(36).substring(2, 12),
                        restoreDate:new Date().toString(),
                        documents:[],
                        last_connection:new Date().toString()
                    })
                    
                    await sendMail.sendMailSimple(email,"Welcome to the Website","You have register in our page!")

                    return done(null,newUser)
                }
                catch(error){
                    return done("Error al crear el usuario: "+error)
                }
            }
        )
    );
    passport.use(
        "login",
        new localStrategy(
            {
                usernameField:"email",
            },
            async (username,password,done)=>{    
                try{
                    const user = await userModel.findOne({email:username})
                    //console.log(user)
                    if(user == null) return done(null,false)
                    if(!comparePassword(user,password)) return done(null,false)
                    
                    //await sendMail.sendMailSimple(user.email,"Welcome to the Website","Welcome!")
                    return done(null,user)
                }
                catch(error){
                    return done("Error al iniciar sesion: " + error)
                }
            }
        )
    )



    passport.use(
        "recoverPassword",
        new localStrategy(
            {
                usernameField:"email",
            },
            async (username,password,done)=>{    
                console.log("hola")
                try{
                    const user = await userModel.findOne({email:username})
                    if(user == null) return done(null,false)                                        
                    return done(null,user)
                }
                catch(error){
                    return done("Error al buscar el mail: " + error)
                }
            }
        )
    );

 

    passport.use(new GitHubStrategy({
        clientID:"Iv1.7430041e813a3fc3",
        clientSecret:"6eae3ce22e289353e43f3bea05521abba1f65bd2",
        callbackURL:"http://localhost:8080/session/githubcallback",
        scope:["user:email"]
        },
        async (accessToken,refreshToken,profile,done)=>{    
            try{
                //console.log(profile)
                const user = await userModel.findOne({email:profile.emails[0].value})
                
                if(user != null) return done(null,user)
                
                let first_name,last_name
                if(profile._json.name!=null) [last_name,first_name] = profile._json.name.split(" ")
                const newUser = await userModel.create({
                        first_name,
                        last_name,
                        email: profile.emails[0].value,
                        age:0,
                        password: "",
                        
                    })

                return done(null,newUser)

            }
            catch(error){
                return done(error)
            }
        }
    )
    );
};



passport.serializeUser((user,done) =>{
    done(null,user._id)
})

passport.deserializeUser(async(id,done) =>{
    try{
        const user = await userModel.findById(id)
        done(null,user)
    }
    catch(error){
        done(error,false)
    }

})





export default initializePassport
