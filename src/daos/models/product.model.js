import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const productCollection = "products"


const productSchema = new Schema({
    title:{ type: String, required: true},
    description:{ type: String, required: true},
    category:{ type: String, required: true},
    price:{ type: Number, required: true},
    stock:{ type: Number, required: true},
    owner:{type: String, required: true, default:"admin"}
})

productSchema.plugin(mongoosePaginate)

export const productModel = model(productCollection, productSchema)


