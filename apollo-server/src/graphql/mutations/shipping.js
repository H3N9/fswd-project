import { ShippingTC } from '../../models'
import { authCreateMiddleware } from './middleware'

export const createShipping = ShippingTC.getResolver('createOne', [authCreateMiddleware])
export const updateShippingById = ShippingTC.getResolver('updateById', [authCreateMiddleware])