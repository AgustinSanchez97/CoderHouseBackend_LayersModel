import cartsServices from "../services/carts.services.js"

class cartsValidator{
    async getAll()
    {
        try{
            const carts = await cartsServices.getAll()
            return carts
        }
        catch(error){
            console.log(error.message)
        }
    }


    async getById(id)
    {
        try{
            return await cartsServices.getById(id)
        }
        catch(error){
            console.log(error.message)
        }        
    }

    async create(data)
    {
        try{
            return await cartsServices.create(data)
        }
        catch(error){
            console.log(error.message)
        }        
    }

    async update(id,data)
    {
        try{
            return await cartsServices.update(id,data,{new:true})
        }
        catch(error){
            console.log(error.message)
        }        
    }

    async delete(id)
    {
        try{            
            return await cartsServices.delete(id)
        }
        catch(error){
            console.log(error.message)
        } 
    }
}


export default new cartsValidator()


