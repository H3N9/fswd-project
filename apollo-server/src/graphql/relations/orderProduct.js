import { OrderProductTC, ProductTC } from '../../models'

OrderProductTC.addRelation(
    'product',
    {
        resolver: () => ProductTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.productId
        },
        projection: { productId: 1 }
    }
)