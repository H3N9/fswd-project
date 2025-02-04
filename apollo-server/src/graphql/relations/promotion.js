import moment from 'moment'
import { PromotionTC, DiscountPricePromotionTC, ProductTC, CouponPromotionTC, OrderPromotionModel } from '../../models'

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

PromotionTC.addFields({
    createdAtWithFormatDateTime: {
        type: 'String',
        resolve: (source) => moment(source.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        projection: { createdAt: 1 },
    },

    updatedAtWithFormatDateTime: {
        type: 'String',
        resolve: (source) => moment(source.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
        projection: { updatedAt: 1 },
    }
})