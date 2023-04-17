import {Router} from 'express'
import { addLogger } from '../utils/logger.js'

const router = Router()



//crear logger
router.get("/loggerTest" , async (req,res) => {
    try 
    {
        //console.log(req.logger)
    }catch (error)
    {
        res.status(500).json({ error: error.message });
    }
})

export default router