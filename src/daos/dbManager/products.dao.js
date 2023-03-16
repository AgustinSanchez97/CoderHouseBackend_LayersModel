import { productModel } from "../../models/product.model.js";


class productDao{
    async getAll()
    {        
        const products = await productModel.find()
        return products
    }
    async getAllByPages(sortMethod,page,limits,orderMethod)
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

    async getById(id)
    {
        return await productModel.findById(id)
    }

    async create(data)
    {
        return await productModel.create(data)
    }

    async update(id,data)
    {
        return await productModel.findByIdAndUpdate(id,data,{new:true})
    }

    async delete(id)
    {
        return await productModel.findByIdAndDelete(id)
    }

}

export default new productDao()