import { schemaComposer } from 'graphql-compose'

import { OrderProductModel, OrderTC, OrderModel, OrderPromotionModel, ProductModel } from '../../models'
import { authCreateMiddleware } from './middleware'

export const createOrder = OrderTC.getResolver('createOne', [authCreateMiddleware]).removeArg('record')
export const removeOrderById = OrderTC.getResolver('removeById')

const setCartInput= schemaComposer.createInputTC({
    name: 'editCartInput',
    fields: {
        productId: 'String!',
        quantity: 'Int!'
    }
})

const setPromotionInput = schemaComposer.createInputTC({
    name: 'setPromotionInput',
    fields: {
        promotionId: 'String!'
    }
})

export const setCart = schemaComposer.createResolver({
    name: 'setCart',
    args: {
        records: [setCartInput]
    },
    type: OrderTC,
    resolve: async ({ args, context }) =>{
        if(context?.user){
            const user = context.user
            let order = await OrderModel.findOne({ status: 'PROCESSING', userId: user._id })
            if (order === null){
                order = await OrderModel.create({ userId: user._id })
            }

            const productOrderInput = await args.records.reduce(async (acc, curr) => {
                return acc.then( async (acc) => {
                    const product = await ProductModel.findById(curr.productId)
                    if (product?.quantity > 0){
                        const newObj = {
                            ...curr,
                            orderId: order._id,
                            quantity: Math.min(product.quantity, curr.quantity)
                        }
                        return [...acc, newObj]
                }
                return acc
                })
            }, Promise.resolve([]))

            await OrderProductModel.deleteMany({ orderId: order._id })
            await OrderProductModel.insertMany(productOrderInput)
            order.updatedAt = Date.now()
            await order.save()

            return order
        }
        throw new Error('You must be authorized');
    }
})

export const setPromotion = schemaComposer.createResolver({
    name: 'setPromotion',
    args: {
        records: [setPromotionInput]
    },
    type: OrderTC,
    resolve: async ({ args, context }) =>{
        if(context?.user){
            const user = context.user
            let order = await OrderModel.findOne({ status: 'PROCESSING', userId: user._id })
            if (order === null){
                order = await OrderModel.create({ userId: user._id })
            }

            const orderPromotionInput = args.records.map((item1) => ({...item1, orderId: order._id }))
            await OrderPromotionModel.deleteMany({ orderId: order._id })
            await OrderPromotionModel.insertMany(orderPromotionInput)
            order.updatedAt = Date.now()
            await order.save()

            return order
        }
        throw new Error('You must be authorized');
    }
})