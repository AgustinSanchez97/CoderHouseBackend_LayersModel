import { cartModel } from "../models/cart.model.js";



class cartDao{
    async getAll()
    {        
        try
        {
            let carts = await cartModel.find()        
            return carts
            
        }
        catch(error)
        {
            console.log(error)
        }
    }

    async getById(id)
    {
        try
        {
            return await cartModel.findById(id)
            
        }
        catch(error)
        {
            console.log(error)
        }
    }

    async create(data)
    {
        try
        {
            return await cartModel.create(data)
            
        }
        catch(error)
        {
            console.log(error)
        }
    }

    async update(id,data)
    {
        try
        {
            return await cartModel.findByIdAndUpdate(id,data)
            
        }
        catch(error)
        {
            console.log(error)
        }
    }

    async delete(id)
    {
        try
        {
            return await cartModel.findByIdAndDelete(id)
            
        }
        catch(error)
        {
            console.log(error)
        }
    }

    async addProductToCart(cartId,productId,data)
    {
        
    }

}


export default new cartDao()