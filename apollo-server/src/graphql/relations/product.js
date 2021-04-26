import { ProductTC, DiscountPricePromotionTC, DiscountPricePromotionModel, OrderProductModel } from '../../models'

ProductTC.addRelation(
    'promotion',
    {
        resolver: () => DiscountPricePromotionTC.getResolver('findOne'),
        prepareArgs: {
            filter: (source) => ({ productId: source._id })
        },
        projection: { _id: 1 },
    }
)

ProductTC.addFields({
    netPrice: {
        type: 'Float',
        resolve: async (source) => {
            const discountPromotion = await DiscountPricePromotionModel.findOne({ productId: source._id })
            let netPrice
            if (discountPromotion?.method === 'DISCOUNT')
                netPrice =  source.price - discountPromotion.discountValue
            else if (discountPromotion?.method === 'PERCENT')
                netPrice =  source.price - (source.price * discountPromotion.discountValue/100)
            else
                netPrice =  source.price
            
            return netPrice
        },
        projection: {_id: 1}
    },

    orderQuantityCount: {
        type: 'Int',
        resolve: async (source) => {
            const orderProducts = await OrderProductModel.find({ productId: source._id }).populate({
                path: 'orderId',
                match: { status: {$ne: 'PROCESSING'}}
            })
            const sumQuantity = orderProducts.reduce((acc, curr) => {
                if (curr.orderId)
                    return acc+curr.quantity
                else
                    return acc
            }, 0)

            return sumQuantity
        }
    }
})