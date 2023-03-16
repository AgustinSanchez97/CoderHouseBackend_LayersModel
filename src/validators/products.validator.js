import productsServices from "../services/products.services.js";

class productsValidator{
    async getAll()
    {
        try{
            const products = await productsServices.getAll()
            return products
        }
        catch(error){
            console.log(error.message)
        }
    }
    async getAllByPages(sortMethod,page,limits,orderMethod)
    {
        try{
            let products = await productsServices.getAllByPages(sortMethod,page,limits,orderMethod)
            return products
        }
        catch(error){
            console.log(error.message)
        }
    }

    async getById(id)
    {
        try{
            return await productsServices.getById(id)
        }
        catch(error){
            console.log(error.message)
        }        
    }

    async create(data)
    {
        try{
            return await productsServices.create(data)
        }
        catch(error){
            console.log(error.message)
        }        
    }

    async update(id,data)
    {
        try{
            return await productsServices.update(id,data,{new:true})
        }
        catch(error){
            console.log(error.message)
        }        
    }

    async delete(id)
    {
        try{            
            return await productsServices.delete(id)
        }
        catch(error){
            console.log(error.message)
        } 
    }
}


export default new productsValidator()


