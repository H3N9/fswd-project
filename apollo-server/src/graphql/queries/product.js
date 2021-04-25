import { ProductTC } from '../../models'

export const products = ProductTC.getResolver('findMany')
export const productById = ProductTC.getResolver('findById')
export const product = ProductTC.getResolver('findOne')
export const productsWithPagination = ProductTC.getResolver('pagination')