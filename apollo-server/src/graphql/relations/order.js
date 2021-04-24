import moment from 'moment'
import { schemaComposer } from 'graphql-compose'
import { OrderTC, UserTC, OrderProductTC, OrderPromotionTC, 
    OrderPromotionModel, OrderProductModel, ShippingTC } from '../../models'

OrderTC.addRelation(
    'user',
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

OrderTC.addRelation(
    'shipping',
    {
        resolver: () => ShippingTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.shippingId
        },
        projection: { shippingId: 1 }
    }
)

const discountsPayload = schemaComposer.createObjectTC({
    name: 'discountsPayload',
    fields: {
        promotionId: 'String',
        type: 'String',
        description: 'String',
        discount: 'Float',
        quantity: 'Int'
    }
})

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
            const netTotalPrice = await source.netTotalPrice()

            return netTotalPrice
        },

        projection: { orderId: 1 }
    },

    discounts: {
        type: [discountsPayload],
        //type: 'String',
        resolve: async (source) => {
            const productDiscounts = await source.getProductDiscount()
            const couponDiscounts = await source.getCouponDiscount()

            return [...productDiscounts, ...couponDiscounts]
        },
        projection: { orderId: 1 }
    }
})