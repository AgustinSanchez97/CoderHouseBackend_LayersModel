import { Router } from 'express'
import productsController from "../controllers/products.controller.js";

const router = Router()


router.get("/:id", productsController.getById)

router.post("/", productsController.createProduct)
router.put('/:id', productsController.update)



export default router