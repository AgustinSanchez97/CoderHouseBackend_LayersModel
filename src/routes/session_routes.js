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
            cart: req.user.cart
    }

    const email = req.user.email
    const password = req.user.password

    const token = jwt.sign({email,password}, "coderSecret",{expiresIn:"1m"})
    res.cookie("token",token, {
        maxAge: 500000,
        httpOnly: true
    })
    res.json({token, message: "login success"})

    //res.status(200)
    //res.status(200).redirect("/login")
})

router.post("/register",passport.authenticate("register", {failureRedirect:"/"}), async (req,res)=>{
    
    return res.status(201).redirect("/login")
})



router.get("/github", passport.authenticate("github"))

router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}), async (req,res)=>{

    req.session.user = req.user
    res.redirect("/")
})




router.get("/logout", async (req,res)=>{
console.log("hola")
console.log(res.cookie)

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
    console.log("dos")

    res.json({user:req.user})
})

export default router
