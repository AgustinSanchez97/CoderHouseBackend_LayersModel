import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils.js";
import passport from "passport";
import cookieParser from "cookie-parser";

import jwt from "jsonwebtoken"


const router = Router()

router.post("/login",passport.authenticate("login", {failureRedirect:"/login"}) ,async (req,res) =>{
    /*
    const{email, password} = req.body    
    
    try{
        const user = await userModel.findOne({email})        
        if(user == null) return res.status(404).redirect("/login")
        if(!comparePassword(user,password)) return res.status(401).redirect("/login")

        user["password"] = undefined
        req.session.user = user

        res.status(200).redirect("/")
    }
    catch(error){
        res.status(500).json({mesagge:error.mesagge})
    }
    */
    if(!req.user) return res.status(404).json({message:"user not found"})
    
    req.session.user = {
            first_name : req.user.first_name,
            last_name: req.user.last_name ,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
    }

    const email = req.user.email
    const password = req.user.password
    

    const token = jwt.sign({email,password}, "coderSecret",{expiresIn:"5m"})
    res.cookie("token",token, {
        maxAge: 50000,
        httpOnly: true
    })
    res.json({token, message: "login success"})
    
    

    //res.status(200)
    //res.status(200).redirect("/login")
})

router.post("/register",passport.authenticate("register", {failureRedirect:"/"}), async (req,res)=>{
    /*
    const{first_name, last_name,email,age,password,role}=req.body
    if(!first_name|| !last_name|| !email|| !age|| !password) return res.status(404).json({mesagge:"Missing required fields"})
    try{
        const user = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword(password),
            role
        })
        res.status(201).redirect("/login")
    }
    catch(error){
        res.status(500).json({mesagge:error.mesagge})
    }
    */

    return res.status(201).redirect("/login")
})



router.get("/github", passport.authenticate("github"))

router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}), async (req,res)=>{

    req.session.user = req.user
    res.redirect("/")
})




router.get("/logout", async (req,res)=>{
req.session.destroy()
res.redirect("/login")
})

//CURRENT
router.get("/current", passport.authenticate("jwt",{session: false}), async (req,res)=>{    
    res.json({user:req.user})
})

export default router
