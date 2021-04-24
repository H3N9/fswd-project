import { OrderTC } from '../../models'
import { authQueryMiddleware, adminPermission } from './middleware'

export const orders = OrderTC.getResolver('findMany', [adminPermission])
export const myOrders = OrderTC.getResolver('findMany', [authQueryMiddleware])