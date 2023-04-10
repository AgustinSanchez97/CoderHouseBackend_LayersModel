import cartsDao from "../daos/classes/carts.dao.js"
import productsDao from "../daos/classes/products.dao.js";
import { json, Router } from 'express'

import ticketRepository from "../repositories/ticket.repository.js"
import {generateTicket} from "../faker.js"

const router = Router()


//crear carrito vacio
router.get("/mockingproducts" , async (req,res) => {
    try 
    {
        const products = generateTicket(100)

        //const ticketData={code,date,totalCost,contact}
        res.json(products)

        //res.redirect("/api/carts/")
    }catch (error)
    {
        res.status(500).json({ error: error.message });
    }
})

export default router