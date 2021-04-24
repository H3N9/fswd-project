import { ProductTC } from '../../models'
import { adminPermission } from '../queries/middleware'

export const createProduct = ProductTC.getResolver('createOne', [adminPermission])
export const updateProductById = ProductTC.getResolver('updateById', [adminPermission])
export const removeProduct = ProductTC.getResolver('removeById', [adminPermission])