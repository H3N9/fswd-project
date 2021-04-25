import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const types = [
    "Dramas",
    "Cosmoslogy",
    "Normal"
]

const ProductSchema = new Schema({
    title: {type: String, required: true, index: true, unique: true},
    publisher: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: Number, required: true},
    types: {type: String, required: true, enum: types},
    quantity: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    description: {type: String},
    image: {type: String}
})

export const ProductModel = mongoose.model('Product', ProductSchema)
export const ProductTC = composeWithMongoose(ProductModel)

export default ProductModel