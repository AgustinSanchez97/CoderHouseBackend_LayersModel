import { Schema, model } from "mongoose";



const ticketsCollection = "tickets"


const ticketSchema = new Schema({
    code:{ type: String, required: true},
    purchase_datetime:{type:Date,required:true},
    amount:{ type: Number, required: true},
    purchaser:{ type: String, required: true},
    leftProducts:[]
})



export const ticketModel = model(ticketsCollection, ticketSchema)
