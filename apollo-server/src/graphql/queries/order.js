import { OrderTC } from '../../models'
import { authQueryMiddleware } from './middleware'

export const orders = OrderTC.getResolver('findMany')
export const myOrders = OrderTC.getResolver('findMany', [authQueryMiddleware])