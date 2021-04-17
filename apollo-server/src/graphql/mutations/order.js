import { schemaComposer } from 'graphql-compose'

import { OrderProductModel, OrderTC, OrderModel } from '../../models'
import { authCreateMiddleware } from './middleware'

export const createOrder = OrderTC.getResolver('createOne', [authCreateMiddleware]).removeArg('record')
export const removeOrderById = OrderTC.getResolver('removeById')

const setCartInput= schemaComposer.createInputTC({
    name: "editCartInput",
    fields: {
        productId: 'String!',
        quantity: 'Int!'
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

            const productOrderInput = args.records.map((item1) => ({...item1, orderId: order._id }))
            await OrderProductModel.deleteMany({ orderId: order._id })
            await OrderProductModel.insertMany(productOrderInput)
            order.updatedAt = Date.now()
            await order.save()

            return order
        }
        throw new Error('You must be authorized');
    }
})