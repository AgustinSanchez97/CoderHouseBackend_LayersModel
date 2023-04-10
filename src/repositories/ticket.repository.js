import ticketDTO from "../daos/dtos/ticketDTO.js";
import ticketDao from "../daos/classes/ticket.dao.js"

class ticketRepository
{
    constructor(dao)
    {
        this.dao = dao
    }


    createTicket= async(ticketData)=>{
        const ticketDtoInstance = new ticketDTO(ticketData)        
        return await this.dao.create(ticketDtoInstance)
    }

    getTickets= async()=>{
        const tickets =this.dao.getAll()
        return await tickets
    }

}



export default new ticketRepository(ticketDao)


