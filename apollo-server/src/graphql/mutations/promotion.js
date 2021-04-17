import { DiscountPricePromotionTC, CouponPromotionTC } from '../../models'

export const createDiscountPricePromotion = DiscountPricePromotionTC.getResolver('createOne')
export const createCouponPromotion = CouponPromotionTC.getResolver('createOne')