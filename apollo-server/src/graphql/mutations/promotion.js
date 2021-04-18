import { PromotionTC, DiscountPricePromotionTC, CouponPromotionTC } from '../../models'

export const createDiscountPricePromotion = DiscountPricePromotionTC.getResolver('createOne')
export const createCouponPromotion = CouponPromotionTC.getResolver('createOne')
export const updatePromotion = PromotionTC.getResolver('updateById')