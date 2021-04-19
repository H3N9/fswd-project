import React, {createContext, useContext, useState} from 'react'

const OrderContext = createContext()

export const OrderProvider = (props) => {
    const { children } = props
    const [orders, setOrders] = useState([])

    const addOrder = (newOrder, amount) => {
        const { _id } = newOrder
        console.log(newOrder)
        const index = orders.findIndex((order) => order.id === _id)
        if(index > -1) {
            const copyArray = [...orders]
            copyArray[index].quantity = copyArray[index].quantity+amount
            setOrders(copyArray)
        }
        else{
            const reStructOrder = {id:_id, quantity: amount, book:newOrder}
            setOrders([...orders, reStructOrder])
        }
        
    }

    const removeCart = () => {
        setOrders([])
    }


    return (
        <OrderContext.Provider value={{order:orders, addOrder, removeCart}}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => useContext(OrderContext)

export default OrderContext