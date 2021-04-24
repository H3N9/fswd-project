import React, {createContext, useContext, useEffect, useState} from 'react'
import {useMutation, useLazyQuery} from '@apollo/client'
import {SETCART_MUTATION} from '../graphql/setCartMutation'
import { useSession } from './session'
import {MYORDER_QUERY} from '../graphql/myOrderQuery'

const OrderContext = createContext()

export const OrderProvider = (props) => {
    const { children } = props
    const [orders, setOrders] = useState([])
    const [setCart] = useMutation(SETCART_MUTATION)
    const {user} = useSession()
    const [loadMyOrder, {loading, data}] = useLazyQuery(MYORDER_QUERY)
    useEffect(() => {
        const loadCart = async () => {
            try {
                await loadMyOrder()
                console.log("Load My Order Success")
            }
            catch (e) {
                console.log("User doesn't login to load my order")
            }
        }
        if(user){
            loadCart()
        }
    }, [user])

    useEffect(() => {
        if(data?.myOrders){
            const copyOrders = data?.myOrders[0]?.orderProducts.map((order) => {
                return {productId: order.productId, quantity: order.quantity, product:order.product}
            }) || []
            if(orders.length > 0){
                orders.forEach((product) => combineItems(product, copyOrders))
                handleSetCart(copyOrders)
            }
            setOrders(copyOrders)
            
        }
    }, [data])

    const combineItems = (product, base) => {
        const { productId, quantity } = product
        const limit = product?.product?.quantity
        const index = base.findIndex((object) => object.productId === productId)
        const totle = index > -1 ? base[index].quantity + quantity:0
        if( totle > limit){
            return
        }
        if(index > -1){
            const addQuantity = base[index]
            addQuantity.quantity = addQuantity.quantity + quantity
            return addQuantity
        }
        else{
            base.push(product)
        }
    }

    const addOrder = (newOrder, amount) => {
        const { _id } = newOrder
        const quantity = newOrder.quantity
        const index = orders.findIndex((order) => order.productId === _id)
        const totle = index > -1 ? orders[index].quantity + amount:0
        if(quantity < totle){
            console.log("Quantity is lower than your order.")
            return false
        }
        if(index > -1 && amount > 0) {
            const copyArray = [...orders]
            copyArray[index].quantity = copyArray[index].quantity+amount
            setOrders(copyArray)
            handleSetCart(copyArray)

        }
        else if(amount > 0){
            const reStructOrder = {productId:_id, quantity: amount, product:newOrder}
            const merge = [...orders, reStructOrder]
            setOrders(merge)
            handleSetCart(merge)
        }
        
    }

    const handleSetCart = async (carts) => {
        const delProduct = carts.map((cart) => {
            return {productId:cart.productId, quantity: cart.quantity}
        })
        if(user){
            try{
                await setCart({variables:{object: delProduct}})
                console.log("Success save my order")
                return true
            }
            catch (e) {
                console.log("Fail save my order")
                return false
            }
        }
    }

    const removeCart = () => {
        if(user){
            try{
                setCart({variables:{object: []}})
                console.log("Success save my order")
                setOrders([])
                return true
            }
            catch (e) {
                console.log("Fail save my order")
                return false
            }
        } 
        setOrders([])  
    }

    
    return (
        <OrderContext.Provider value={{orders:orders, addOrder, removeCart}}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => useContext(OrderContext)

export default OrderContext