import { OrderTC } from '../../models'
import { authCreateMiddleware } from './middleware'

export const createOrder = OrderTC.getResolver('createOne', [authCreateMiddleware]).removeArg('record')
export const removeOrderById = OrderTC.getResolver('removeById')