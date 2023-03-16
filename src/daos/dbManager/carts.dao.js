import { cartModel } from "../../models/cart.model.js";



class cartDao{
    async getAll()
    {        
        let carts = await cartModel.find()        
        return carts
    }

    async getById(id)
    {
        return await cartModel.findById(id)
    }

    async create(data)
    {
        return await cartModel.create(data)
    }

    async update(id,data)
    {
        return await cartModel.findByIdAndUpdate(id,data)
    }

    async delete(id)
    {
        return await cartModel.findByIdAndDelete(id)
    }

    async addProductToCart(cartId,productId,data)
    {
        
    }

}


export default new cartDao()