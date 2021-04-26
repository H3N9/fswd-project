import { schemaComposer } from 'graphql-compose'
import { UserInputError } from 'apollo-server-express'
import { OrderProductModel, OrderTC, OrderModel, OrderPromotionModel, ProductModel, ShippingModel } from '../../models'
import { authCreateMiddleware } from './middleware'

//export const createOrder = OrderTC.getResolver('createOne', [authCreateMiddleware]).removeArg('record')
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
    resolve: async ({ args, context }) => {
        if (context?.user){
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

export const setShipping = schemaComposer.createResolver({
    name: 'setShipping',
    args: {
        shippingId: 'String!'
    },
    type: OrderTC,
    resolve: async ({ args, context }) => {
        if (context?.user){
            const user = context.user
            const shipping = await ShippingModel.findOne({ _id: args.shippingId, userId: user._id })
            if (shipping === null){
                throw new Error('you have not permission to access');
            }
            let order = await OrderModel.findOne({ status: 'PROCESSING', userId: user._id })
            if (order === null){
                order = await OrderModel.create({ userId: user._id })
            }
            order.shippingId = shipping._id
            order.updatedAt = Date.now()
            await order.save()

            return order
        }
        throw new Error('You must be authorized');
    }
})

export const confirmOrder = schemaComposer.createResolver({
    name: 'confirmOrder',
    args: {},
    type: OrderTC,
    resolve: async ({ args, context }) => {
        if (context?.user){
            const user = context.user
            const order = await OrderModel.findOne({ status: 'PROCESSING', userId: user._id })
            const orderProducts = await OrderProductModel.find({ orderId: order._id })
            if (orderProducts.length === 0){
                throw new Error('There are no items in the cart');
            }
            for (const orderProduct of orderProducts) {
                const product = await ProductModel.findById(orderProduct.productId)
                const newQuantity = product.quantity - orderProduct.quantity
                if (newQuantity < 0){
                    orderProduct.quantity = product.quantity
                    await orderProduct.save()
                    if (product.quantity <= 0){
                        await orderProduct.delete()
                    }
                    throw new Error(`product ${product.title} (id=${product._id}) quantity is not enough`);
                }
                product.quantity = newQuantity
                product.updatedAt = Date.now()
                await product.save()
            }
            order.status = 'COMPLETE'
            order.netTotalPrice = await order.getNetTotalPrice()
            await order.save()

            return order
        }
        throw new Error('You must be authorized');
    }
})

const updateOrderHandleMiddleware = async (resolve, source, args, context, info) => {
    if (args?.record?.status === 'PROCESSING')
        throw new UserInputError('order status can not be set to PROCESSING ')
    if (context?.user?.isAdmin){
        const newArgs = {
            ...args,
            record: {
                status: args?.record?.status || 'COMPLETE',
                updatedAt: Date.now()
            }
        }

        return resolve(source, newArgs, context, info);
    }
    else{
        throw new Error('You must be authorized');
    }
}

export const updateOrder = OrderTC.getResolver('updateById', [updateOrderHandleMiddleware])