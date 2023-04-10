import ProductDTO from "../daos/dtos/productDTO.js";
import productDAO from "../daos/classes/products.dao.js"

class productRepository
{
    constructor(dao)
    {
        this.dao = dao
    }


    createTicket= async(productData)=>{
        const ticketDtoInstance = ProductDTO(productData)
        return await this.dao.create(ticketDtoInstance)
    }

    getTickets= async()=>{
        const tickets =this.dao.getAll()
        return await tickets
    }

}



export default new productRepository(productDAO)


