import productsController from "../controllers/products.controller.js";


import Router from "./router.js";


export default class viewRoutes extends Router {
    init() {
        //BUSCAR PRODUCTO POR ID
        this.get("/:id", ['ADMIN',"PREMIUM"],productsController.getById)
        //CREAR PRODUCTO
        this.post("/", ['ADMIN',"PREMIUM"],productsController.createProduct)
        //ACTUALIZAR PRODUCTO
        this.put('/:id', ['ADMIN',"PREMIUM"],productsController.update)
    }
}
