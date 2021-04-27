import { DiscountPricePromotionTC, ProductTC, CouponPromotionTC, OrderPromotionModel } from '../../models'

DiscountPricePromotionTC.addRelation(
    'product',
    {
        resolver: () => ProductTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.productId
        },
        projection: { productId: 1 }
    }
)

CouponPromotionTC.addFields({
    orderQuantityCount: {
        type: 'Int',
        resolve: async (source) => {
            const orderCoupons = await OrderPromotionModel.find({ promotionId: source._id }).populate('orderId')
            const newOrderCoupons = orderCoupons.filter((item1) => (item1.orderId.status !== 'PROCESSING'))

            return newOrderCoupons.length
        }
    }
})