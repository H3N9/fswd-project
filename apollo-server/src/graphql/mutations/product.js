import { ProductTC } from '../../models'
import { adminPermission } from '../queries/middleware'
import { productValid } from './middleware'

export const createProduct = ProductTC.getResolver('createOne', [adminPermission, productValid])
export const updateProductById = ProductTC.getResolver('updateById', [adminPermission, productValid])
export const removeProduct = ProductTC.getResolver('removeById', [adminPermission])