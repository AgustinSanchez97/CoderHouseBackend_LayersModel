import { ticketModel } from "../models/ticket.model.js"



class ticketDao{
    async getAll()
    {
        try{
            let tickets = await ticketModel.find()
            return tickets
        }
        catch(error){
            console.log(error)
        }
    }

    async getById(id)
    {
        try{
            return await ticketModel.findById(id)

        }
        catch(error){
            console.log(error)
            
        }
    }

    async create(data)
    {
        try{
            return await ticketModel.create(data)

        }
        catch(error){
            console.log(error)
            
        }
    }

    async update(id,data)
    {
        try{
            return await ticketModel.findByIdAndUpdate(id,data)

        }
        catch(error){
            console.log(error)
            
        }
    }

    async delete(id)
    {
        try{
            return await ticketModel.findByIdAndDelete(id)

        }
        catch(error){
            console.log(error)
            
        }
    }
}


export default new ticketDao()