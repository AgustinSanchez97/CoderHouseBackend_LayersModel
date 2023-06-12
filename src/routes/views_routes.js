import productsController from "../controllers/products.controller.js";
import cartsController from "../controllers/carts.controller.js";
import usersController from "../controllers/user.controller.js";

import Router from "./router.js";



export default class viewRoutes extends Router {
    init() {

      
        this.get("/",['PUBLIC'], productsController.getAllByPages)
        this.get("/add/:id",['USER',"PREMIUM"], productsController.addProduct)
        
        this.get("/edit/:id",['ADMIN',"PREMIUM"], productsController.getById)
        
        this.get("/delete/:id",['ADMIN',"PREMIUM"], productsController.deleteById)

        //Vista de todos los carts solo para el administrador
        this.get("/api/carts/" ,['ADMIN'],cartsController.getAllCartsView)
        
        //Vista del carrito del usuario actual
        this.get("/editCart/",['ADMIN',"USER","PREMIUM"],cartsController.editCartByIdView)

        this.get("/editCart/:id",['ADMIN',"USER","PREMIUM"],cartsController.editCartByIdView)
        
        
        //PARA SUBIR DOCUMENTOS
        this.get("/profileUploadFiles",["USER","PREMIUM"],usersController.renderToUploadFiles)
        

        //POSIBLE ENDPOINT OBSOLETO
        //this.get('/carts/:id',cartsController.editCartsById)

        const isSession = (req,res,next)=>{
            //DECIDIR SI REDIRECCIONAR A PAGINA PRINCIPAL O AL PERFIL UNA VEZ LOGUEADO
            if(req.session.user) return res.redirect("/")
            next()
        }

        this.get("/login", ['PUBLIC'],isSession,(req,res)=>{
            res.render("login")
        })
        this.get("/register",['PUBLIC'],isSession,(req,res)=>{
            res.render("register")
        })


        this.get("/profile",['USER',"PREMIUM", 'ADMIN'] ,usersController.renderAllTicketsForUser)

        
        this.get("/api/users/admin",['ADMIN'], usersController.getAllUsersAdmin)

        this.get("/chat",['USER',"PREMIUM", 'ADMIN'], usersController.liveChat)
        
        this.get("/ticket/:id",['USER',"PREMIUM", 'ADMIN'], cartsController.renderTicket)
        
    }
}
  


