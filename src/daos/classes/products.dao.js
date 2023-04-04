import { productModel } from "../models/product.model.js";


class productDao{
    async getAll()
    {
        try
        {
            const products = await productModel.find()
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
            
            let products = await productModel.paginate(productModel.find(filters),options)
            return products
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
            return await productModel.findById(id)
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
            return await productModel.create(data)
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
            return await productModel.findByIdAndUpdate(id,data,{new:true})
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
            return await productModel.findByIdAndDelete(id)
        }
        catch(error)
        {
            console.log(error)
        }
    }

}

export default new productDao()