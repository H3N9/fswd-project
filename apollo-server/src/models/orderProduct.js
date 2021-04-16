import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const OrderProductSchema = new Schema({
    productId: { type: String, require: true, ref: 'Product' },
    unit: {type: Number, require: true, default: 1},
    createdAt: { type: Date, default: new Date() },
    orderId: { type: String, require: true, ref: 'Order' }
})

export const OrderProductModel = mongoose.model('OrderProduct', OrderProductSchema)

export const OrderProductTC = composeWithMongoose(OrderProductModel)

export default OrderProductModel