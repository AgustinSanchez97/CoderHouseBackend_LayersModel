import { Router } from "express";
import { comparePassword, hashPassword } from "../utils.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import usersDao from "../daos/classes/users.dao.js";

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

    //LAST CONNECTION
    const user = await usersDao.getByEmail(email)
    const data = {
        last_connection : new Date()
    }
    usersDao.update(user[0].id,data)

    //1 HORA
    const token = jwt.sign({email,password}, "coderSecret",{expiresIn:3600000})
    res.cookie("token",token, {
        maxAge: 500000,
        httpOnly: true,
        //1 HORA
        expires: new Date(Date.now() + 3600000)
    })    
    

    res.json({token, message: "login success"})    
})

router.post("/register",passport.authenticate("register", {failureRedirect:"/register"}), async (req,res)=>{
    
    return res.status(201).redirect("/login")
})



//RECUPERACION DE CONTRASEÑA
router.post("/recoverPassword",passport.authenticate("recoverPassword", {failureRedirect:"/recoverPassword"}) ,async (req,res) =>{
    res.status(201)
    return res.json({ message: "login success"})
})

router.get("/github", passport.authenticate("github"))

router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}), async (req,res)=>{

    req.session.user = req.user
    res.redirect("/")
})

router.get("/logout", async (req,res)=>{    
    if(!req.session.user) return res.redirect("/login")

    //LAST CONNECTION
    const user = await usersDao.getByEmail(req.session.user.email)
    const data = {
        last_connection : new Date()
    }
    usersDao.update(user[0].id,data)

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
