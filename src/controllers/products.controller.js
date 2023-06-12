import cartDao from "../daos/classes/carts.dao.js";
import productDao from "../daos/classes/products.dao.js";
import productRepository from "../repositories/product.repository.js"
import sendMail from "../utils/sendMail.js";



class productsController {
    //RENDERIZADO DE PRODUCTOS POR PAGINAS Y METHODOS PARA SORTEAR
    async getAllByPages(req,res)
    {        
        try{
         
            const {page,limit,category,sortMethod}= req.query

            let products = await productDao.getAllByPages(category,page||1,limit||4,sortMethod)
            

            let allProducts = await productDao.getAll()
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
                  
            res.render("index",{
                title:"Products",
                products,allCategories,actualCategory,user:req.session.user,actualSort,
            })
        }
        catch(error){
            console.log(error)
        }
    }

    //RENDERIZA EL PRODUCTO POR ID
    async getById(req,res)
    {
        try{
            const product = await productDao.getById(req.params.id)
            if(product != undefined)
            {
                //res.status(200).send({status:"success",payload:product})
                res.render("edit", {title:"EditProduct",product})
            }
            else res.status(500).redirect("/")
        }
        catch(error){
            console.log(error)
        }
    }

    //AGREGA PRODDUCTO AL CARRO DESDE EL RENDERIZADO
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


    //ACTUALIZAR PRODUCTO
    async update(req,res)
    {
        try{
            const product = await productDao.update(req.params.id,req.body)            
            res.status(200).send({status:"success",payload:product}).redirect("/")            
        }
        catch(error){
            res.status(500)
            console.log(error)
        }
    }

    //BORRAR PRODUCTO POR ID
    async deleteById(req,res)
    {
        try{
            const product = await productDao.delete(req.params.id)
            await sendMail.sendMailSimple(product.owner,"Deleted Product",`The product ${product.title} has been deleted!`)

            res.redirect("/")
        }
        catch(error){
            console.log(error)
        }
    }

    //CREAR UN PRODUCTO
    async createProduct(req,res)
    {        
        try{            
            const product = await productRepository.createProduct(req.body)
            
            res.status(200).redirect("/")
        }
        catch(error){
            res.status(500)
            console.log(error)
        }
    }        
}



export default new productsController()