import { Schema, model, SchemaType } from "mongoose";


const chatsCollection = "allChats"

const chatSchema = new Schema({    
    messages: [

    ],
    chatDate:{type:Date}
})



export const chatModel = model(chatsCollection, chatSchema)