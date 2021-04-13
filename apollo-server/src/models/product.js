import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const ProductSchema = new Schema({
    name: {type: String, required: true, index: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    created: { type: Date, default: new Date() },
    updated: { type: Date, default: new Date() },
    description: {type: String}
})

export const ProductModel = mongoose.model('Product', ProductSchema)
export const ProductTC = composeWithMongoose(ProductModel)

export default ProductModel