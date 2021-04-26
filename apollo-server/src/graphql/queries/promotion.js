import { PromotionTC, DiscountPricePromotionTC, CouponPromotionTC } from '../../models'

export const promotions = PromotionTC.getResolver('findMany')
export const DiscountPricePromotion = DiscountPricePromotionTC.getResolver('findOne')
export const DiscountPricePromotions = DiscountPricePromotionTC.getResolver('findMany')
export const CouponPromotionsWithPagination = CouponPromotionTC.getResolver('pagination')