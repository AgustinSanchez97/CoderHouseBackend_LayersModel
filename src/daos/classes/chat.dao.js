import { chatModel } from "../models/chat.model.js";



class chatDao{
    async getAll()
    {        
        try
        {
            let chats = await chatModel.find()        
            return chats
            
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async getByDate(date)
    {
        try
        {
            return await chatModel.find({chatDate:date})
            
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
            return await chatModel.findById(id)            
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
            return await chatModel.create(data)
            
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
            return await chatModel.findByIdAndUpdate(id,data)
            
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
            return await chatModel.findByIdAndDelete(id)
            
        }
        catch(error)
        {
            console.log(error)
        }
    }

}


export default new chatDao()