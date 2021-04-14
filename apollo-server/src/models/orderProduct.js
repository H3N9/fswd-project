import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const OrderProductSchema = new Schema({
    productById: { type: String, require: true, ref: 'Product' },
    unit: {type: Number, require: true, default: 1},
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
})

export const OrderProductModel = mongoose.model('OrderProduct', OrderProductSchema)

export const OrderProductTC = composeWithMongoose(OrderProductModel)

export default OrderProductModel