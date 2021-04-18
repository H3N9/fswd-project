import moment from 'moment'
import { OrderTC, UserTC, OrderProductTC, OrderPromotionTC, OrderPromotionModel, OrderProductModel } from '../../models'

OrderTC.addRelation(
    'orderBy',
    {
        resolver: () => UserTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.userId,
        },
        projection: { userId: 1 },
    }
)

OrderTC.addRelation(
    'orderProducts',
    {
        resolver: () => OrderProductTC.getResolver('findMany'),
        prepareArgs: {
            filter: (source) => ({ orderId: source._id }),
        },
        projection: { _id: 1 },
    }
)

OrderTC.addRelation(
    'discountCoupons',
    {
        resolver: () => OrderPromotionTC.getResolver('findMany'),
        prepareArgs: {
            filter: (source) => ({ orderId: source._id }),
        },
        projection: { _id: 1 },
    }
)

OrderTC.addFields({
    createdAtWithFormatDateTime: {
        type: 'String',
        resolve: (source) => moment(source.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        projection: { createdAt: 1 },
    },

    updatedAtWithFormatDateTime: {
        type: 'String',
        resolve: (source) => moment(source.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
        projection: { updatedAt: 1 },
    },

    totalPrice: {
        type: 'Float',
        resolve: async (source) => await source.totalPrice(),
        projection: { orderId: 1 }
    },

    netTotalPrice: {
        type: 'Float',
        resolve: async (source) => {
            //const orderPromotions = await OrderPromotionModel.find({ orderId: source._id }).populate('promotionId')

            const totalPrice = await source.totalPrice()
            const totalDiscount = await source.totalDiscount()
            const totalPriceDiscount = totalPrice - totalDiscount

            return totalPriceDiscount
        },

        projection: { orderId: 1 }
    }
})