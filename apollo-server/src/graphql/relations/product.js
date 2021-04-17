import { ProductTC, DiscountPricePromotionTC } from '../../models'

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