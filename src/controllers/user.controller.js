import userValidator from "../validators/products.validator.js";



class usersController {
    async getAllUsers(req,res)
    {
        try{
            let allUsers = await userValidator.getAll()
        }
        catch(error){
            console.log(error)
        }
    }
}



export default new usersController()