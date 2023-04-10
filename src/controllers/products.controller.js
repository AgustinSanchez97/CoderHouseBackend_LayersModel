import productsValidator from "../validators/products.validator.js";
import cartDao from "../daos/classes/carts.dao.js";

import productDao from "../daos/classes/products.dao.js";



class productsController {
    async getAllByPages(req,res)
    {
        //console.log(req.session)
        try{
         
            const {page,limit,category,sortMethod}= req.query

            let products = await productsValidator.getAllByPages(category,page||1,limit||4,sortMethod)
            

            let allProducts = await productsValidator.getAll()
            let allCategories = []
            allCategories.push("todos")

            allProducts.forEach(product => {        
                if(allCategories.find(category => category == product.category) != null||product.category == undefined) return
                allCategories.push(product.category)
            });

            let actualSort = ""
            if(sortMethod!=undefined) actualSort = sortMethod

            let actualCategory = "todos"
            if(category!=undefined) actualCategory = category
            
            //console.log(req.session)
            //const role =req.session.user.role
            res.render("index",{
                title:"Products",
                products,allCategories,actualCategory,user:req.session.user,actualSort,
            })
        }
        catch(error){
            console.log(error)
        }
    }

    async getById(req,res)
    {
        try{
            const product = await productsValidator.getById(req.params.id)
            res.render("edit", {title:"EditProduct",product} )
        }
        catch(error){
            console.log(error)
        }
    }

    async update(req,res)
    {
        try{            
            
            const product = await productDao.update(req.params.id,req.body)
            //res.render("edit", {title:"EditProduct",product} )
            
            await res.redirect("/")

            
        }
        catch(error){
            console.log(error)
        }
    }



    async deleteById(req,res)
    {
        try{
            const product = await productsValidator.delete(req.params.id)
            res.redirect("/")
            res.render("delete", {title:"DeleteProduct",product} )
        }
        catch(error){
            console.log(error)
        }
    }

    async createProduct(req,res)
    {        
        try{
            await productDao.create(req.body)
            res.redirect("/")
        }
        catch(error){
            console.log(error)
        }
    }

    async addProduct(req,res)
    {        
        //console.log(req.session.user)
        const userData = req.session.user
        try{
            const carts = await cartDao.getAll()

            let allCarts = [...carts]
            const product = await productDao.getById(req.params.id)
            let cartsProducts = []

            for (let index = 0; index < allCarts.length; index++) {
                const cart = await cartDao.getById(allCarts[index].id)
                if(cart?.products.length == 0)
                {
                    const _product = 
                    {
                        cartId:cart.id,
                        productID:product.id,
                        quantity:"0"
                    }
                    cartsProducts.push(_product)

                }        
                for (let j = 0; j < cart?.products?.length; j++) {

                    const cartproducts = cart?.products[j]?.product[0]
                    const cartproducts2 = cart?.products[j]?.product[1]
                    //REVISAR POSIBLE BUG
                    if(cartproducts == product.id)
                    {
                        const _product =
                        {
                            cartId:cart.id,
                            productID:cartproducts,
                            quantity:cartproducts2
                        }
                        cartsProducts.push(_product)
                    }
                }
            }

            res.render("add", {title:"AddProduct",product,carts,userData})
        }
        catch(error){
            console.log(error)
        }
    }
    
}



export default new productsController()