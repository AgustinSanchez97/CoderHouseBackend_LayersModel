import productsController from "../controllers/products.controller.js";
import cartsController from "../controllers/carts.controller.js";
import usersController from "../controllers/user.controller.js";

import Router from "./router.js";



export default class viewRoutes extends Router {
    init() {

      //RENDERIZA PAGINA PRINCIPAL
        this.get("/",['PUBLIC'], productsController.getAllByPages)
      //RENDERIZA PAGINA PARA AGREGAR PRODUCTO AL CARRO
        this.get("/add/:id",['USER',"PREMIUM"], productsController.addProduct)
      //RENDERIZA PAGINA PARA EDITAR PRODUCTO        
        this.get("/edit/:id",['ADMIN',"PREMIUM"], productsController.getById)
      //BORRADO DE PRODUCTO POR ID        
        this.get("/delete/:id",['ADMIN',"PREMIUM"], productsController.deleteById)

        //Vista de todos los carts solo para el administrador
        this.get("/api/carts/" ,['ADMIN'],cartsController.getAllCartsView)
        
        //Vista del carrito del usuario actual
        this.get("/editCart/",['ADMIN',"USER","PREMIUM"],cartsController.editCartByIdView)
        //Vista del carrito del usuario actual
        this.get("/editCart/:id",['ADMIN',"USER","PREMIUM"],cartsController.editCartByIdView)
        
        
        //PARA SUBIR DOCUMENTOS
        this.get("/profileUploadFiles",["USER","PREMIUM"],usersController.renderToUploadFiles)
        

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

        //RENDERIZADO DEL PERFIL DEL USUARIO
        this.get("/profile",['USER',"PREMIUM", 'ADMIN'] ,usersController.renderAllTicketsForUser)
        
        //RENDERIZADO DEL PANEL DEL ADMINISTRADOR DE USUARIOS
        this.get("/api/users/admin",['ADMIN'], usersController.getAllUsersAdmin)
        
        //RENDERIZADO DEL CHAT
        this.get("/chat",['USER',"PREMIUM", 'ADMIN'], usersController.liveChat)
        
        //RENDERIZADO DEL TICKET POR ID
        this.get("/ticket/:id",['USER',"PREMIUM", 'ADMIN'], cartsController.renderTicket)
        
    }
}
  


