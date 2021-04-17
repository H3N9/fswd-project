import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const ProductSchema = new Schema({
    name: {type: String, required: true, index: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    description: {type: String}
})

export const ProductModel = mongoose.model('Product', ProductSchema)
export const ProductTC = composeWithMongoose(ProductModel)

export default ProductModel