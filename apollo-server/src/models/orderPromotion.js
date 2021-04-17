import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const OrderPromotionSchema = new Schema({
    promotionId: { type: String, require: true, ref: 'Promotion' },
    createdAt: { type: Date, default: Date.now },
    orderId: { type: String, require: true, ref: 'Order' }
})

export const OrderPromotionModel = mongoose.model('OrderPromotion', OrderPromotionSchema)

export const OrderPromotionTC = composeWithMongoose(OrderPromotionModel)

export default OrderPromotionModel