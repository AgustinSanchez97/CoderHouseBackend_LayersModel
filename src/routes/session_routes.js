import { Router } from "express";
import { userModel } from "../daos/models/user.model.js"
import { comparePassword, hashPassword } from "../utils.js";
import passport from "passport";
import cookieParser from "cookie-parser";

import jwt from "jsonwebtoken"


const router = Router()

router.post("/login",passport.authenticate("login", {failureRedirect:"/login"}) ,async (req,res) =>{

    if(!req.user) return res.status(404).json({message:"user not found"})
    
    req.session.user = {
            first_name : req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            cart: req.user.cart,
    }

    const email = req.user.email
    const password = req.user.password

    //1 HORA
    const token = jwt.sign({email,password}, "coderSecret",{expiresIn:3600000})
    res.cookie("token",token, {
        maxAge: 500000,
        httpOnly: true,
        //1 HORA
        expires: new Date(Date.now() + 3600000)
    })    
    

    res.json({token, message: "login success"})
    
    //res.status(200)
    //res.status(200).redirect("/login")
})

router.post("/register",passport.authenticate("register", {failureRedirect:"/register"}), async (req,res)=>{
    
    return res.status(201).send(res).redirect("/login")
})



//RECUPERACION DE CONTRASEÑA
router.post("/recoverPassword",passport.authenticate("recoverPassword", {failureRedirect:"/recoverPassword"}) ,async (req,res) =>{
    console.log(req.user)
    //if(!req.user) return res.status(404).json({message:"user not found"})
    res.status(201)
    return res.json({ message: "login success"})

})

router.get("/github", passport.authenticate("github"))

router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}), async (req,res)=>{

    req.session.user = req.user
    res.redirect("/")
})




router.get("/logout", async (req,res)=>{


res.cookie("token", {
    //expires: Date.now(),
    maxAge: 0,
    httpOnly: true
})

req.session.destroy()
res.redirect("/login")
})

//CURRENT
router.get("/current", passport.authenticate("jwt",{session: false}), async (req,res)=>{
    

    res.json({user:req.user})
})

export default router
