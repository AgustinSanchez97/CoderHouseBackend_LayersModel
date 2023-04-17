import { Router } from "express";

import productsRouter from "../routes/products_routes.js"
import viewRoutes from "../routes/views_routes.js"
import cartsRouter from "../routes/carts_routes.js"
import session_routes from "../routes/session_routes.js"
import mockingRoutes from "../routes/mocking_routes.js"
import loggerRoutes from "../routes/logger_routes.js"

import errorsHandler from "../middleware/errors/errorsHandler.js";
import { addLogger } from "../utils/logger.js";

const router = Router()
const viewRouter = new viewRoutes()

router.use("/api/products", productsRouter)
router.use("/", viewRouter.getRouter())
router.use("/api/carts",cartsRouter)
router.use("/session",session_routes)

router.use("/",mockingRoutes)

router.use(errorsHandler)
router.use(addLogger)
router.use("/",loggerRoutes)




export default router

