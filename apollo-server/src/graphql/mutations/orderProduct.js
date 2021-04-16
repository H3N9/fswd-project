import { schemaComposer } from 'graphql-compose'

import { OrderProductTC, OrderProductModel, ProductTC, OrderTC, OrderModel } from '../../models'

const editCartInput= schemaComposer.createInputTC({
    name: "editCartInput",
    fields: {
        productId: 'String!',
        unit: 'Int!'
    }
})

export const editCart = schemaComposer.createResolver({
    name: 'editCart',
    args: {
        records: [editCartInput]
    },
    type: OrderTC,
    resolve: async ({ args, context }) =>{
        if(context?.user){
            const user = context.user
            const order = await OrderModel.findOne({ status: 'PROCESSING', userId: user._id })

            const productOrderInput = args.records.map((item1) => ({...item1, orderId: order._id }))
            await OrderProductModel.deleteMany({ orderId: order._id })
            await OrderProductModel.insertMany(productOrderInput)

            return order
        }
        throw new Error('You must be authorized');
    }
})