import productsController from "../controllers/products.controller.js";
import cartsController from "../controllers/carts.controller.js";
import Router from "./router.js";
//import { Router } from "express";
//const router = Router()



export default class viewRoutes extends Router {
    init() {
        /*
      this.get('/', ['PUBLIC'], this.getAllUsers);
      this.get('/currentUser', ['USER', 'USER_PREMIUM'], (req, res) => {
        res.sendSuccess(req.user);
      });*/
      
        this.get("/",['PUBLIC'], productsController.getAllByPages)
        this.get("/add/:id",['USER'], productsController.addProduct)
        this.get("/edit/:id",['ADMIN'], productsController.getById)
        this.get("/delete/:id",['ADMIN'], productsController.deleteById)


        this.get("/api/carts/" ,['ADMIN'],cartsController.getAllCarts)
        this.get("/editCart/:id",['ADMIN'],cartsController.editCartById)
        this.get("/api/carts/:cid",['ADMIN'],cartsController.deleteCartById)


        //POSIBLE ENDPOINT OBSOLETO
        this.get('/carts/:id',cartsController.editCartsById)

        const isSession = (req,res,next)=>{
            //DECIDIR SI REDIRECCIONAR A PAGINA PRINCIPAL O AL PERFIL UNA VEZ LOGUEADO
            //if(req.session.user) return res.redirect("/profile")
            next()
        }

        this.get("/login", ['PUBLIC'],isSession,(req,res)=>{
            res.render("login")
        })
        this.get("/register",['PUBLIC'],isSession,(req,res)=>{
            res.render("register")
        })
        this.get("/profile",['PUBLIC'],(req,res)=>{
            if(!req.session.user) return res.redirect("/login")
            res.render("profile",{user:req.session.user})
        })
        
    }
}
  

/*
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
*/
//export default new viewRoutes()
