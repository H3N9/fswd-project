import { ShippingTC } from '../../models'
import { authQueryMiddleware } from './middleware'

export const shippings = ShippingTC.getResolver('findMany')
export const myShippings = ShippingTC.getResolver('findMany', [authQueryMiddleware])