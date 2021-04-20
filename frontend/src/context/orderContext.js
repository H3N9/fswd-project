import React, {createContext, useContext, useState} from 'react'
import {useMutation} from '@apollo/client'
import {SETCART_MUTATION} from '../graphql/setCartMutation'

const OrderContext = createContext()

export const OrderProvider = (props) => {
    const { children } = props
    const [orders, setOrders] = useState([])
    const [setCart] = useMutation(SETCART_MUTATION)

    const addOrder = (newOrder, amount) => {
        const { _id } = newOrder
        console.log(newOrder)
        const index = orders.findIndex((order) => order.id === _id)
        if(index > -1) {
            const copyArray = [...orders]
            copyArray[index].quantity = copyArray[index].quantity+amount
            const cart = copyArray.map((order) => {
                const productId = order.id
                const quantity = order.quantity
                return {productId, quantity}
            })
            cart[cart.length] = {productId:_id, quantity: amount}
            console.log(cart)
            setOrders(copyArray)

        }
        else{
            const reStructOrder = {id:_id, quantity: amount, book:newOrder}
            const cart = orders.map((order) => {
                const productId = order.id
                const quantity = order.quantity
                return {productId, quantity}
            })
            console.log(cart)
            setOrders([...orders, reStructOrder])
        }
        
    }

    const removeCart = () => {
        setOrders([])
        setCart({variables:{object:[]}})
    }


    return (
        <OrderContext.Provider value={{orders:orders, addOrder, removeCart}}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => useContext(OrderContext)

export default OrderContext