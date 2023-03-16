import cartsDao from "../daos/dbManager/carts.dao.js"
import productsDao from "../daos/dbManager/products.dao.js";
import { json, Router } from 'express'
const router = Router()


//crear carrito vacio
router.post("/" , async (req,res) => {
    try 
    {
        const cart = await cartsDao.create()
        res.redirect("/api/carts/")        
    }catch (error)
    {
        res.status(500).json({ error: error.message });
    }
})
//actualizar carro
router.put("/:id", async (req,res) => {
    
    try 
    {
        const allProductsInCart = await cartsDao.getById(req.params.id)
        //await console.log( await req.body.product[0])
        //await console.log( await req.body.product[1])

        //await console.log( await req.body)
        //await console.log( allProductsInCart)
        //await console.log( allProductsInCart.products)
        //console.log(allProductsInCart.products[0])
        //console.log(allProductsInCart.products.find(product => product._productId == req.body._productId)== null)

        let productInCart = allProductsInCart.products.find(product => product._productId == req.body._productId)

        let index = allProductsInCart.products.findIndex(product => product._productId == req.body._productId);

        const productToAdd = await productsDao.getById(req.body._productId)            
        
        if(productToAdd.stock <= req.body.product) return
        if(productInCart == null)
        {
            allProductsInCart.products.push(req.body)
        }
        else
        {
            //console.log(allProductsInCart.products[index])
            
            allProductsInCart.products[index]=req.body
        }
        //console.log(req.body._productId)

/*
        for (let index = 0; index < allProductsInCart.products.length; index++) 
        {
            const productId = allProductsInCart.products[index].product[0];
            const productQuantity = allProductsInCart.products[index].product[1]
            //console.log( await req.body.products)
            console.log(productId==req.body.product[0])
            console.log(productId,productQuantity)            
        }
        */
        //await console.log( allProductsInCart.products.length)


        
        //await console.log( allProductsInCart.products.find(()=>{ req.body[0]}))
        
        //allProductsInCart.products.push(req.body)
        const cart = await cartsDao.update(req.params.id, allProductsInCart)
        res.json(cart)
        /*
        */
        /*
        const cart = await cartsDao.update(req.params.id, req.body)
        res.json(cart)
        */
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message })
    }

})
//Actualiza el producto en el carro especifico
router.put("/:cid/product/:pid" ,async (req,res) => {

})
/*
router.post("/:cid/product/:pid" ,(req,res) => {

})
*/
//borrar producto especifico de carrito
router.delete("/:cid/products/:pid" ,async (req,res) => {
    
    try 
    {                
        const allProductsInCart = await cartsDao.getById(req.params.cid)
        
        const productToDelete = await productsDao.getById(req.params.pid)

        //console.log(allProductsInCart)
        //console.log(productToDelete)


        let productInCart = allProductsInCart.products.find(product => product._productId == req.params.pid)

        let index = allProductsInCart.products.findIndex(product => product._productId == req.params.pid);

        
        if(productInCart == null) return
        
        allProductsInCart.products.splice(index,1)
        
        //console.log(allProductsInCart.products)
        
        
        const cart = await cartsDao.update(req.params.cid, allProductsInCart)
        res.json(cart)


        //res.json(cart)
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
        res.json(cart)
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message })
    }
})


export default router