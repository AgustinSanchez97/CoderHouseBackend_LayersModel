import { productModel } from "../models/product.model.js";


class productServices{
    getAll()
    {        
        const products = productModel.find()
        return products
    }
     getAllByPages(sortMethod,page,limits,orderMethod)
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
        
        let products =  productModel.paginate(productModel.find(filters),options)
        return products
    }

     getById(id)
    {
        return  productModel.findById(id)
    }

     create(data)
    {
        return  productModel.create(data)
    }

     update(id,data)
    {
        return  productModel.findByIdAndUpdate(id,data,{new:true})
    }

     delete(id)
    {
        return  productModel.findByIdAndDelete(id)
    }

}

export default new productServices()