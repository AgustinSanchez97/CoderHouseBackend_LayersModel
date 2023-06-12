import { Router } from "express";

import viewRoutes from "../routes/views_routes.js"
import productsRoutes from "../routes/products_routes.js"
import userRoutes from "../routes/user_routes.js"
import cartsRoutes from "../routes/carts_routes.js"
import session_routes from "../routes/session_routes.js"
import mockingRoutes from "../routes/mocking_routes.js"

/*
import loggerRoutes from "../routes/logger_routes.js"
import swaggerDocs from "../utils/swagger.js"
import errorsHandler from "../middleware/errors/errorsHandler.js";
import { addLogger } from "../utils/logger.js";
router.use("/api/docs",swaggerDocs)
router.use(errorsHandler)
router.use(addLogger)
router.use("/",loggerRoutes)
*/

const router = Router()
const viewRouter = new viewRoutes()
const productsRouter = new productsRoutes()
const userRouter = new userRoutes()
const cartsRouter = new cartsRoutes()



router.use("/", viewRouter.getRouter())
router.use("/api/products", productsRouter.getRouter())
router.use("/api/users",userRouter.getRouter())
router.use("/api/carts",cartsRouter.getRouter())
router.use("/session",session_routes)



router.use("/",mockingRoutes)





export default router