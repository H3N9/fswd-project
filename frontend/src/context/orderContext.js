import React, {createContext, useContext, useState} from 'react'

const OrderContext = createContext()

export const OrderProvider = (props) => {

    const [order, setOrder] = useState([])

    const addOrder = (newOrder) => {
        console.log(order)
        setOrder([...order, ...newOrder])
    }

    const removeCart = () => {
        setOrder([])
    }


    return (
        <OrderContext.Provider value={{order:order, addOrder, removeCart}}>
            {props.children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => useContext(OrderContext)

export default OrderContext