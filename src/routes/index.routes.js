import { Router } from "express";

import productsRouter from "../routes/products_routes.js"
import viewsRouter from "../routes/views_routes.js"
import cartsRouter from "../routes/carts_routes.js"
import session_routes from "../routes/session_routes.js"


const router = Router()

router.use("/api/products", productsRouter)
router.use("/",viewsRouter)
router.use("/api/carts",cartsRouter)
router.use("/session",session_routes)


export default router

