import { DiscountPricePromotionTC, ProductTC } from '../../models'

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