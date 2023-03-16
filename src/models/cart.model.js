import { Schema, model, SchemaType } from "mongoose";


const cartsCollection = "carts"

const cartSchema = new Schema({    
    products: [
        
    ]    
})



export const cartModel = model(cartsCollection, cartSchema)