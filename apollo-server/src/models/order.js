import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const enumOrderStatus = {
    PROCESSING: 'Processing',
    COMPLETE: 'Complete',
    CLOSED: 'Closed',
}

const OrderSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: Date.now },
    status: {
        type: String,
        require: true,
        enum: Object.keys(enumOrderStatus),
        default: 'PROCESSING',
        index: true
    },
    orderById: { type: String, require: true, ref: 'User' }
})

export const OrderModel = mongoose.model('Order', OrderSchema)

export const OrderTC = composeWithMongoose(OrderModel)

export default OrderModel