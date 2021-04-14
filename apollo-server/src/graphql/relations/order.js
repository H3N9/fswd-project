import moment from 'moment'
import { OrderTC, UserTC } from '../../models'

OrderTC.addRelation(
    'orderBy',
    {
        resolver: () => UserTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.orderById,
        },
        projection: { orderById: 1 },
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