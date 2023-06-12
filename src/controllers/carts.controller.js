import cartsDao from "../daos/classes/carts.dao.js";
import productsDao from "../daos/classes/products.dao.js";
import ticketRepository from "../repositories/ticket.repository.js"
import ticketDao from "../daos/classes/ticket.dao.js";
import usersDao from "../daos/classes/users.dao.js";

class cartsController {
    //RENDERIZADO DE TODOS LOS CARROS
    async getAllCartsView(req,res)
    {
        try{
            let carts = await cartsDao.getAll()            
            res.render("carts",{
                title:"Carts",carts
            })
        }
        catch(error){
            console.log(error)
        }
    }
    //CREACION DE CARRO
    async createCart(req,res)
    {
        try 
        {
            const cart = await cartsDao.create()            
            res.status(200).send({status:"success",payload:cart})
        }
        catch (error)
        {
            res.status(500).json({ error: error.message });
        }
    }
    //ACTUALIZACION DE CARRO POR ID
    async updateCartById(req,res)
    {
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
    }

    //RENDERIZACION DE CARRO POR ID    
    async editCartByIdView(req,res)
    {
        if(!req.session.user) return res.redirect("/login")
        try{
            //COMPRUEBO SI EL USUARIO ESTA INTENTA VER UN CARRO DE OTRO USUARIO
            const checkUser = await usersDao.getByEmail(req.session.user.email)            
            if(checkUser[0].cart != req.params.id) return res.redirect("/")
            
            const cart = await cartsDao.getById(req.params.id)            
            const productsData = cart.products
            const user = req.session.user
            //AGREGADO DE PRECIOS
            for (let index = 0; index < productsData.length; index++) {
                const product = await productsDao.getById(productsData[index]._productId)
                productsData[index].price=product.price                
            }
            
            if(productsData.length == 0) res.redirect("/")
            else res.render("editCart", {title:"EditCart",cart,productsData,user} )
        }
        catch(error){
            console.log(error)
        }
    }
    
    //BORRADO DE CARRO POR ID
    async deleteCartById(req,res)
    {
        try
        {
            const cart = await cartsDao.delete(req.params.id)
            res.status(200).json(cart)
        }
        catch (error) 
        {
            res.status(500).json({ error: error.message })
        }    
    }

    //CONTROL DEL TICKET DE COMPRA
    async checkTicket(req,res)
    {
        try
        {
            const cart = await cartsDao.getById(req.params.cid)

            //TOTAL PRICE
            let totalCost = 0
            let leftProducts = []

            for (let index = 0; index < cart.products.length; index++) {
                const product = await productsDao.getById(cart.products[index]._productId);
                let quantityRequired = cart.products[index].product[0]
                

                
                if ((product.stock-quantityRequired) >= 0)
                {
                    totalCost += product.price * quantityRequired
                    product.stock -= quantityRequired
                    
                    if(product.stock == 0) await productsDao.delete(product.id)
                    else await productsDao.update(product.id,product)
                }

                else
                {
                    leftProducts.push({_productId: product.id,product:[quantityRequired]})
                }
                
            }

            //CODE
            const code = Math.random().toString(36).substring(2, 12)
            
            //DATE BUY
            const date = new Date().toString()                
        
            //PURCHASER
            let contact
            if(req.session.user) contact = req.session.user.email

            const ticketData={code,date,totalCost,contact,leftProducts}
            
            //CREACION DE TICKET
            const ticket = await ticketRepository.createTicket(ticketData)
            
            //DELETE CART PRODUCTS
            if(leftProducts.length <= 0)cart.products = []            
            else cart.products = leftProducts

            await cartsDao.update(req.params.cid, cart)

            res.redirect(`/ticket/${ticket.id}`)
        }
        catch (error) 
        {
            res.status(500).json({ error: error.message })
        }    
    }


    //CREACION DE TICKET DE COMPRA
    async purchaseTicket(req,res)
    {
        try
        {
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
            const ticket = await ticketRepository.createTicket(ticketData)
            
            //DELETE CART PRODUCTS
            allProductsInCart.products = []
            await cartsDao.update(req.params.cid, allProductsInCart)

            res.redirect(`/ticket/${ticket.id}`)
        }
        catch (error) 
        {
            res.status(500).json({ error: error.message })
        }    
    }

    //RENDERIZADO DE TICKET
    async renderTicket(req,res)
    {
        try
        {
            const ticket = await ticketDao.getById(req.params.id)            
            res.render("ticket", {title:"Ticket",ticket} )

        }
        catch (error) 
        {
            res.status(500).json({ error: error.message })
        }    
    }


    //BORRADO DE PRODCUTO DE UN CARRO
    async deleteProductFromCart(req,res)
    {
        try 
        {                
            const allProductsInCart = await cartsDao.getById(req.params.cid)
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
    }

    //JSON DATA DEL CARRO
    async cartJsonData(req,res)
    {
        try
        {
            const cart = await cartsDao.getById(req.params.cid)
            if(cart == null) res.status(500).json(cart)
            else res.status(200).send({status:"success",payload:cart}).json(cart)        
        } 
        catch (error) 
        {
            res.status(500).json({ error: error.message })
        }
    }


    //VER USO DE ESTE ENDPOINT
    async editCartsById(req,res)
    {
        try
        {
            const product = await cartsDao.getById(req.params.id)
            res.render("edit", {title:"Edit",product,user} )
        }
        catch(error)
        {
            console.log(error)
        }
    }
}


export default new cartsController()