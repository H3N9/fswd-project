import { ProductTC, DiscountPricePromotionTC, DiscountPricePromotionModel } from '../../models'

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
    }
})