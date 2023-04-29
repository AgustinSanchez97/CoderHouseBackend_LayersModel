import { json, Router } from 'express'
import {generateTicket} from "../faker.js"

const router = Router()


//crear Mock
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