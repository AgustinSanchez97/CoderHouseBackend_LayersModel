import cartsDao from "../daos/classes/carts.dao.js"
import productsDao from "../daos/classes/products.dao.js";
import { json, Router } from 'express'

import ticketRepository from "../repositories/ticket.repository.js"

const router = Router()


//crear carrito vacio
router.post("/" , async (req,res) => {
    try 
    {
        const cart = await cartsDao.create()
        console.log(cart)
        res.status(200).send({status:"success",payload:cart})
    }catch (error)
    {
        res.status(500).json({ error: error.message });
    }
})
//crear carro para admin con interfaz
/*
router.post("/admin" , async (req,res) => {
    try 
    {
        const cart = await cartsDao.create()
        console.log(cart)
        res.status(200).redirect("/")
    }catch (error)
    {
        res.status(500).json({ error: error.message });
    }
})*/
//actualizar carro
router.put("/:id", async (req,res) => {
    
    try 
    {
        const allProductsInCart = await cartsDao.getById(req.params.id)

        let productInCart = allProductsInCart.products.find(product => product._productId == req.body._productId)

        let index = allProductsInCart.products.findIndex(product => product._productId == req.body._productId);

        const productToAdd = await productsDao.getById(req.body._productId)        
        if(productToAdd.stock < req.body.product) return
        if(productInCart == null)
        {
            allProductsInCart.products.push(req.body)
        }
        else
        {
            
            allProductsInCart.products[index]=req.body
        }
        await cartsDao.update(req.params.id, allProductsInCart)
        const cart = await cartsDao.getById(req.params.id)
        
        await res.status(200).json(cart)
        
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message })
    }

})


router.get("/:cid", async (req,res) => {    
    try 
    {
        const cart = await cartsDao.getById(req.params.cid)
        
        //console.log(typeof cart)

        if(cart == null) res.status(500).json(cart)

        else res.status(200).send({status:"success",payload:cart}).json(cart)
        

        
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message })
    }

})

router.get("/:cid/purchase" ,async (req,res) => {
    
    if(!req.session.user) res.redirect("/")

    const allProductsInCart = await cartsDao.getById(req.params.cid)
    
    //CODE
    const code = Math.random().toString(36).substring(2, 12)
    
    //DATE BUY
    const date = new Date().toString()

    //TOTAL PRICE
    let totalCost = 0
    for (let index = 0; index < allProductsInCart.products.length; index++) {
        const product = await productsDao.getById(allProductsInCart.products[index]._productId);
        let quantity = allProductsInCart.products[index].product[0]
        totalCost += product.price * quantity
        product.stock -= quantity        
        if (product.stock > 0) await productsDao.update(product.id,product)
        else await productsDao.delete(product.id)
        
    }

    //PURCHASER
    let contact
    if(req.session.user) contact = req.session.user.email
    const ticketData={code,date,totalCost,contact}
    
    //CREACION DE TICKET
    ticketRepository.createTicket(ticketData)
    
    //DELETE CART PRODUCTS
    allProductsInCart.products = []
    await cartsDao.update(req.params.cid, allProductsInCart)
    res.redirect("/")
})

//borrar producto especifico de carrito
router.delete("/:cid/products/:pid" ,async (req,res) => {
    
    try 
    {                
        const allProductsInCart = await cartsDao.getById(req.params.cid)        
        const productToDelete = await productsDao.getById(req.params.pid)


        let productInCart = allProductsInCart.products.find(product => product._productId == req.params.pid)

        let index = allProductsInCart.products.findIndex(product => product._productId == req.params.pid);

        
        if(productInCart == null) return
        
        allProductsInCart.products.splice(index,1)
        
        const cart = await cartsDao.update(req.params.cid, allProductsInCart)
        res.json(cart)

    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message })
    }
})

//borrar carrito especifico
router.delete("/:id",async (req,res) => {
    try 
    {                
        const cart = await cartsDao.delete(req.params.id)
        res.status(200).json(cart)
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message })
    }
})


export default router