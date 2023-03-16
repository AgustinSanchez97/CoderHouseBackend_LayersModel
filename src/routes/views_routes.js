import { Router } from "express";
//import productsDao from "../daos/dbManager/products.dao.js";
import productsController from "../controllers/products.controller.js";
import cartDao from "../daos/dbManager/carts.dao.js";

import cartsController from "../controllers/carts.controller.js";

const router = Router()

router.get("/", productsController.getAllByPages)


router.get("/add/:id", productsController.addProduct)
router.get("/edit/:id", productsController.getById)
router.get("/delete/:id", productsController.deleteById)


router.get("/api/carts/" ,cartsController.getAllCarts)
router.get("/editCart/:id",cartsController.editCartById)
router.get("/api/carts/:cid",cartsController.deleteCartById)


//POSIBLE ENDPOINT OBSOLETO
router.get('/carts/:id',cartsController.editCartsById)

const isSession = (req,res,next)=>{
    //DECIDIR SI REDIRECCIONAR A PAGINA PRINCIPAL O AL PERFIL UNA VEZ LOGUEADO
    //if(req.session.user) return res.redirect("/profile")
    next()
}

router.get("/login", isSession,(req,res)=>{
    res.render("login")
})
router.get("/register",isSession,(req,res)=>{
    res.render("register")
})
router.get("/profile",(req,res)=>{
    if(!req.session.user) return res.redirect("/login")
    res.render("profile",{user:req.session.user})
})


export default router