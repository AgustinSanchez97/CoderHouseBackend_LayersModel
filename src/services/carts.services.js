import { cartModel } from "../daos/models/cart.model.js"


class cartsServices{
     getAll()
    {        
        let carts =  cartModel.find()        
        return carts
    }

     getById(id)
    {
        return  cartModel.findById(id)
    }

     create(data)
    {
        return  cartModel.create(data)
    }

     update(id,data)
    {
        return  cartModel.findByIdAndUpdate(id,data)
    }

     delete(id)
    {
        return  cartModel.findByIdAndDelete(id)
    }

}


export default new cartsServices()