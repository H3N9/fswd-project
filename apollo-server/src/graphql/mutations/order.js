import { OrderTC } from '../../models'

export const createOrder = OrderTC.getResolver('createOne')
export const removeOrderById = OrderTC.getResolver('removeById')