import { PromotionTC, DiscountPricePromotionTC } from '../../models'

export const promotions = PromotionTC.getResolver('findMany')
export const DiscountPricePromotion = DiscountPricePromotionTC.getResolver('findOne')