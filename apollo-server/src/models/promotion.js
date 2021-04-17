import mongoose from 'mongoose'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const DKey = 'type'
const enumPromotionType = {
    DISCOUNT_PRICE: 'DiscountPrice',
    COUPON: "Coupon"
}

const enumPromotionMethod = {
    DISCOUNT: 'Discount',
    PERCENT: 'Percent'
}

const PromotionSchema = new Schema({
    type: {
        type: String,
        require: true,
        enum: Object.keys(enumPromotionType),
        index: true,
    },
    method: {
        type: String,
        require: true,
        enum: Object.keys(enumPromotionMethod),
    },
    discountValue: { type: Number, require: true },
    description: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const DiscountPricePromotionSchema = new Schema({
    productId: { type: String, require: true, ref: 'Product' }
})

const CouponPromotionSchema = new Schema({
    promotionCode: { type: String, require: true },
    quantity: {type: Number, require: true, default: 1},
})

const discriminatorOptions = {
    inputType: {
      removeFields: ['createdAt', 'updatedAt'],
    },
  }

PromotionSchema.set('discriminatorKey', DKey)

export const PromotionModel = mongoose.model('Promotion', PromotionSchema)
export const DiscountPricePromotionModel = PromotionModel.discriminator(enumPromotionType.DISCOUNT_PRICE, DiscountPricePromotionSchema)
export const CouponPromotionModel = PromotionModel.discriminator(enumPromotionType.COUPON, CouponPromotionSchema)

export const PromotionTC = composeWithMongooseDiscriminators(PromotionModel)
export const DiscountPricePromotionTC = PromotionTC.discriminator(DiscountPricePromotionModel, { name: enumPromotionType.DISCOUNT_PRICE, ...discriminatorOptions })
export const CouponPromotionTC = PromotionTC.discriminator(CouponPromotionModel, { name: enumPromotionType.COUPON, ...discriminatorOptions })

export default PromotionModel