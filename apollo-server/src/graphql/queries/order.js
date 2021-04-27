import { schemaComposer } from 'graphql-compose'
import { OrderTC, OrderModel } from '../../models'
import { authQueryMiddleware, adminPermission } from './middleware'

export const orders = OrderTC.getResolver('findMany', [adminPermission])
export const myOrders = OrderTC.getResolver('findMany', [authQueryMiddleware])
export const order = OrderTC.getResolver('findById', [adminPermission])
export const ordersWithPagination= OrderTC.getResolver('pagination', [adminPermission])

const orderCountPayload = schemaComposer.createObjectTC({
    name: 'orderCountPayload',
    fields: {
        processingCount: 'Int',
        completeCount: 'Int',
        shippedCount: 'Int',
        closedCount: 'Int'
    }
})

export const ordersCount = schemaComposer.createResolver({
    name: 'ordersCount',
    args: {},
    type: orderCountPayload,
    resolve: async ({ context }) => {
        if (context?.user?.isAdmin){
            const orders = await OrderModel.find()
            let processingCount = 0
            let completeCount = 0
            let shippedCount = 0
            let closedCount = 0

            orders.forEach((item1) => {
                if (item1.status === 'PROCESSING')
                    processingCount++
                else if (item1.status === 'COMPLETE')
                    completeCount++
                else if (item1.status === 'SHIPPED')
                    shippedCount++
                else
                    closedCount++
            })

            return { processingCount, completeCount, shippedCount, closedCount }
        }
        else{
            throw new Error('You must be authorized');
        }
    }
})