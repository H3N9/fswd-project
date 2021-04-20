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
        loadCart()
    }, [])

    useEffect(() => {
        if(data?.myOrders){
            const copyOrders = data?.myOrders[0]?.orderProducts.map((order) => {
                return {productId: order.productId, quantity: order.quantity, product:order.product}
            })
            setOrders(copyOrders)
            console.log(copyOrders)
        }
    }, [data])

    const addOrder = (newOrder, amount) => {
        const { _id } = newOrder
        const index = orders.findIndex((order) => order.productId === _id)
        const cart = orders.map((order) => {
            return {productId: order.productId, quantity: order.quantity}
        })
        if(index > -1 && amount > 0) {
            const copyArray = [...orders]
            copyArray[index].quantity = copyArray[index].quantity+amount
            cart[index].quantity = copyArray[index].quantity
            console.log(cart)
            setOrders(copyArray)
            handleSetCart(cart)

        }
        else if(amount > 0){
            const reStructOrder = {productId:_id, quantity: amount, product:newOrder}
            cart[cart.length] = {productId:_id, quantity: amount}
            console.log(cart)
            setOrders([...orders, reStructOrder])
            handleSetCart(cart)
        }
        
    }

    const handleSetCart = (cart) => {
        if(user){
            try{
                setCart({variables:{object: cart}})
                console.log("Success save my order")
            }
            catch (e) {
                console.log("Fail save my order")
            }
        }
    }

    const removeCart = () => {
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