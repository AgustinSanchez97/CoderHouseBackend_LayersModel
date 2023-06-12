import cartsController from "../controllers/carts.controller.js";
import Router from "./router.js";

export default class viewRoutes extends Router {
    init() {
        //crear carrito vacio
        this.post("/" , ["PREMIUM","PUBLIC","USER"], cartsController.createCart)

        //crear panel de carro para admin con interfaz?

        //actualizar carro
        this.put("/:id",["PREMIUM","USER"], cartsController.updateCartById)

        //get para ver datos recibidos en json
        this.get("/:cid", ["PUBLIC"],cartsController.cartJsonData)

        //realizacion de la compra y del ticket
        //this.get("/:cid/purchase", ["PREMIUM","USER"], cartsController.purchaseTicket)
        this.get("/:cid/purchase", ["PREMIUM","USER"], cartsController.checkTicket)

        //borrar producto especifico de carrito
        this.delete("/:cid/products/:pid", ['ADMIN',"PREMIUM","USER"],cartsController.deleteProductFromCart)

        //borrar carrito especifico
        this.delete("/:id", ['ADMIN',"PREMIUM","USER"],cartsController.deleteCartById)
    }
}