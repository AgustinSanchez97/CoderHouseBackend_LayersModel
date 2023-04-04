import { Schema, model } from "mongoose";



const ticketsCollection = "tickets"


const ticketSchema = new Schema({
    code:{ type: String, required: true},    
    purchase_datetime:{type:Date,required:true},    
    amount:{ type: Number, required: true},
    purchaser:{ type: String, required: true}
})



export const ticketModel = model(ticketsCollection, ticketSchema)











//code: String debe autogenerarse y ser único
//purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
//amount: Number, total de la compra.
//purchaser: String, contendrá el correo del usuario asociado al carrito.