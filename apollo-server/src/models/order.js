import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { OrderProductModel, OrderPromotionModel, DiscountPricePromotionModel } from '.'

const { Schema } = mongoose

const enumOrderStatus = {
    PROCESSING: 'Processing',
    COMPLETE: 'Complete',
    SHIPPED: 'shipped',
    CLOSED: 'Closed',
}

const OrderSchema = new Schema({
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now, index: true },
    status: {
        type: String,
        require: true,
        enum: Object.keys(enumOrderStatus),
        default: 'PROCESSING',
        index: true
    },
    userId: { type: String, require: true, ref: 'User' },
    netTotalPrice: { type: Number },
    shippingId: {type: String, ref: 'Shipping'},
    imagePayment: {type: String}
})

OrderSchema.method('getProductDiscount', async function(){
    const orderProducts = await OrderProductModel.find({ orderId: this._id }).populate('productId')
    const productIdList = orderProducts.map((item1) => item1.productId._id)
    const discountPricePromotions = await DiscountPricePromotionModel.find({ productId: {$in: productIdList } })

    const discountObjs = discountPricePromotions.reduce((acc, curr) => {
        const index = orderProducts.findIndex((item1) => item1.productId._id+'' === curr.productId)
        if (index !== -1){
            const orderProduct = orderProducts[index]
            const discount = (curr.method === 'DISCOUNT')?curr.discountValue:(orderProduct.productId.price * curr.discountValue/100)
            const newObj = {
                promotionId: curr._id,
                type: curr.type,
                discount,
                description: curr.description,
                quantity: orderProduct.quantity
            }

            return [...acc, newObj]
        }

        return acc
    }, [])

    return discountObjs
})

OrderSchema.method('totalProductDiscount', async function(){
    const productDiscounts = await this.getProductDiscount()
    const totalDiscount = productDiscounts.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.discount)
    }, 0)
    
    return totalDiscount
})

OrderSchema.method('getTotalPrice', async function(){
    const orderProducts = await OrderProductModel.find({ orderId: this._id }).populate('productId')
    const totalPriceRaw = orderProducts.reduce((acc, curr) => acc+(curr.productId.price*curr.quantity), 0)
    const totalProductDiscount = await this.totalProductDiscount()

    return totalPriceRaw - totalProductDiscount
})

OrderSchema.method('getCouponDiscount', async function(){
    const totalPrice = await this.getTotalPrice()
    const coupons = await OrderPromotionModel.find({ orderId: this._id }).populate('promotionId')

    const couponDiscount = coupons.reduce((acc, curr) => {
        const promotion = curr.promotionId
        const discount = (promotion.method === 'DISCOUNT')?promotion.discountValue:(totalPrice * promotion.discountValue/100)
        const newObj = {
            promotionId: promotion._id,
            type: promotion.type,
            discount,
            description: promotion.description,
            quantity: 1
        }

        return [...acc, newObj]
    }, [])

    return couponDiscount
})

OrderSchema.method('totalCouponDiscount', async function(){
    const couponDiscounts = await this.getCouponDiscount()
    const totalDiscount = couponDiscounts.reduce((acc, curr) => {
        return acc + curr.discount
    }, 0)

    return totalDiscount
})

OrderSchema.method('getNetTotalPrice', async function(){
    if (this.netTotalPrice){
        return this.netTotalPrice
    }
    else{
        const totalPrice = await this.getTotalPrice()
        const totalCouponDiscount = await this.totalCouponDiscount()

        return totalPrice - totalCouponDiscount
    }
})

export const OrderModel = mongoose.model('Order', OrderSchema)

export const OrderTC = composeWithMongoose(OrderModel)

export default OrderModel