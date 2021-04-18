import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { OrderProductModel, OrderPromotionModel, DiscountPricePromotionModel } from '.'

const { Schema } = mongoose

const enumOrderStatus = {
    PROCESSING: 'Processing',
    COMPLETE: 'Complete',
    CLOSED: 'Closed',
}

const OrderSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: {
        type: String,
        require: true,
        enum: Object.keys(enumOrderStatus),
        default: 'PROCESSING',
        index: true
    },
    userId: { type: String, require: true, ref: 'User' },
})

OrderSchema.method('totalPrice', async function(){
    const orderProducts = await OrderProductModel.find({ orderId: this._id }).populate('productId')
    const totalPrice = orderProducts.reduce((acc, curr) => acc+(curr.productId.price*curr.quantity), 0)

    return totalPrice
})

OrderSchema.method('totalDiscount', async function(){
    const orderProducts = await OrderProductModel.find({ orderId: this._id }).populate('productId')
    const productIdList = orderProducts.map((item1) => item1.productId._id)
    const discountPricePromotions = await DiscountPricePromotionModel.find({ productId: {$in: productIdList } })

    const totalDiscount = discountPricePromotions.reduce((acc, curr) => {
        const index = orderProducts.findIndex((item1) => item1.productId._id+'' === curr.productId)
        if (index !== -1){
            const orderProduct = orderProducts[index]
            let total
            if (curr.method === 'DISCOUNT')
                total = orderProduct.quantity * curr.discountValue
            else
                total = orderProduct.quantity * (orderProduct.productId.price * curr.discountValue/100)
            return acc+total
        }
        return acc
    }, 0)
    
    return totalDiscount
})

export const OrderModel = mongoose.model('Order', OrderSchema)

export const OrderTC = composeWithMongoose(OrderModel)

export default OrderModel