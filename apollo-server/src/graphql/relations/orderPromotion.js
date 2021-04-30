import { OrderPromotionTC, CouponPromotionTC } from '../../models'

OrderPromotionTC.addRelation(
    'couponPromotion',
    {
        resolver: () => CouponPromotionTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.promotionId
        },
        projection: { promotionId: 1 }
    }
)