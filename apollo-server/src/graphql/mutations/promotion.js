import { PromotionTC, DiscountPricePromotionTC, CouponPromotionTC } from '../../models'
import { adminPermission } from './middleware'

export const createDiscountPricePromotion = DiscountPricePromotionTC.getResolver('createOne', [adminPermission])
export const createCouponPromotion = CouponPromotionTC.getResolver('createOne', [adminPermission])
export const updatePromotion = PromotionTC.getResolver('updateById', [adminPermission])
export const removeDiscountPriceById = DiscountPricePromotionTC.getResolver('removeById', [adminPermission])