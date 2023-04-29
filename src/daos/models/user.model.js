import { Schema, model } from "mongoose";



const userCollection = "users"


const userSchema = new Schema({
    first_name:{ type: String, required: true},
    last_name:{ type: String, required: true},
    email:{ type: String, required: true},
    age:{ type: Number, },
    password:{ type: String, },
    role:{ type: String, required: true, default:"user"},
    cart:{type: String},
    restoreCode:{type: String},
    restoreDate:{type:Date}
})



export const userModel = model(userCollection, userSchema)


