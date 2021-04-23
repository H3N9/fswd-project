import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const ShippingSchema = new Schema({
    address: { type: String, required: true, index: true },
    subDistrict: { type: String },
    district: { type: String },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userId: { type: String, require: true, ref: 'User' }
})

export const ShippingModel = mongoose.model('Shipping', ShippingSchema)

export const ShippingTC = composeWithMongoose(ShippingModel)

export default ShippingModel