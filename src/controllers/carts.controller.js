import cartDao from "../daos/classes/carts.dao.js";
import cartsValidator from "../validators/carts.validator.js";


class cartsController {
    async getAllCarts(req,res)
    {
        try{
            let carts = await cartsValidator.getAll()
            res.render("carts",{
                title:"Carts",carts
            })
        }
        catch(error){
            console.log(error)
        }
    }
    
    async editCartById(req,res)
    {
        try{
            const cart = await cartsValidator.getById(req.params.id)            
            const productsData = cart.products
            res.render("editCart", {title:"EditCart",cart,productsData} )
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteCartById(req,res)
    {
        try{
            res.redirect("/")
            res.render("delete", {title:"DeleteCart",cart})
        }
        catch(error){
            console.log(error)
        }
    }

    //VER USO DE ESTE ENDPOINT
    async editCartsById(req,res)
    {
        try{
            const product = await cartDao.getById(req.params.id)
            res.render("edit", {title:"Edit",product} )
        }
        catch(error){
            console.log(error)
        }
    }

}



export default new cartsController()