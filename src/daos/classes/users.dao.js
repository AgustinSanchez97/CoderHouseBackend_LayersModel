import { userModel } from "../models/user.model.js";
import cartsDao from "./carts.dao.js";



class userDao{
    async getAll()
    {
        try
        {
            const products = await userModel.find()
            return products
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async getAllByPages(sortMethod,page,limits,orderMethod)
    {
        try
        {
            //console.log(orderMethod)
            let options =
            {                        
                page:page,
                limit:limits,            
            }        
            
            let filters = {}
            //filters.category = "todos"
            if(sortMethod != null && sortMethod != "todos")
            {
                filters.category = sortMethod
            }
            
            if(orderMethod == 1 || orderMethod == -1)
            {
                options.sort = {price:orderMethod}
            }
            
            let products = await userModel.paginate(userModel.find(filters),options)
            return products
        }
        catch(error)
        {
            console.log(error)
        }
    }

    async getByEmail(email)
    {
        try
        {
            const user = await userModel.find({email})
            return user
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async getByRecoverCode(code)
    {
        try
        {
            const user = await userModel.find({restoreCode:code})
            return user
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
            return await userModel.create(data)
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
            //console.log(data)
            return await userModel.findByIdAndUpdate(id,data,{new:true})
        }
        catch(error)
        {
            console.log(error)
        }
    }

    async createDocuments(id,data)
    {
        try
        {            
            return await userModel.findByIdAndUpdate(id,{$push:{documents:data}},{new:true})
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async deleteDocuments(id,data)
    {
        try
        {
            return await userModel.findByIdAndUpdate(id,{$unset:{documents:""}})
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
            const user = await userModel.findById(id)            
            await cartsDao.delete(user.cart)
            return await userModel.findByIdAndDelete(id)
        }
        catch(error)
        {
            console.log(error)
        }
    }

}

export default new userDao()