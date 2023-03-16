import userServices from "../services/user.services.js"

class userValidator{
    async getAll()
    {
        try{
            const products = await userServices.getAll()
            return products
        }
        catch(error){
            console.log(error.message)
        }
    }
}


export default new userValidator()


