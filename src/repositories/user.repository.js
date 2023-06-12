import UserDTO from "../daos/dtos/userDTO.js";
import userDao from "../daos/classes/users.dao.js"

class userRepository
{
    constructor(dao)
    {
        this.dao = dao
    }


    createUser= async(userData)=>{
        const userDtoInstance = new UserDTO(userData)
        return await this.dao.create(userDtoInstance)
    }

    getUsers= async()=>{
        const users =this.dao.getAll()
        return await users
    }

}



export default new userRepository(userDao)


