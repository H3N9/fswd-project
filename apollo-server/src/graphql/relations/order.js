import moment from 'moment'
import { OrderTC, UserTC, OrderProductTC } from '../../models'

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

OrderTC.addFields({
    createdAtWithFormat: {
        type: 'String',
        resolve: (source) => moment(source.createdAt).fromNow(),
        projection: { createdAt: 1 },
    },

    createdAt: {
        type: 'String',
        resolve: (source) => source.createdAt,
        projection: { createdAt: 1 }
    }
})