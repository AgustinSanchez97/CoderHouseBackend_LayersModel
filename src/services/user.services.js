import { userModel } from "../daos/models/user.model.js"




class userServices{
    getAll()
    {        
        const products = userModel.find()
        return products
    }
}

export default new userServices()