import { Router } from "express";

import productsRouter from "../routes/products_routes.js"
import viewRoutes from "../routes/views_routes.js"
import cartsRouter from "../routes/carts_routes.js"
import session_routes from "../routes/session_routes.js"
import cartRoutes from "../routes/cart_routes.js"

const router = Router()
const viewRouter = new viewRoutes()

router.use("/api/products", productsRouter)
router.use("/", viewRouter.getRouter())
router.use("/api/carts",cartsRouter)
router.use("/session",session_routes)

router.use("/currentCart",cartRoutes)



export default router

