import moment from 'moment'
import { OrderTC, UserTC, OrderProductTC, OrderPromotionTC } from '../../models'

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
    'promotionUse',
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
})