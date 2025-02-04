import React, {createContext, useContext, useEffect, useState} from 'react'
import {useMutation, useLazyQuery} from '@apollo/client'
import {SETCART_MUTATION} from '../graphql/setCartMutation'
import { useSession } from './session'
import {MYORDER_QUERY} from '../graphql/myOrderQuery'
import {SETPROMOTION_MUTATION} from '../graphql/setPromotionMutation'


const OrderContext = createContext()

export const OrderProvider = (props) => {
    const { children } = props
    const [orders, setOrders] = useState([])
    const [beforeOrders, setBeforeOrders] = useState([])
    const [setCart] = useMutation(SETCART_MUTATION)
    const {user} = useSession()
    const [setPromotion] = useMutation(SETPROMOTION_MUTATION)
    const [coupon, setCoupon] = useState(null)
    const [loadMyOrder, { data }] = useLazyQuery(MYORDER_QUERY, {variables: {object: {status: 'PROCESSING' }}})

    const setOrdersHandle = (carts) => {
        setOrders(carts)
        handleSetCart(carts)
    }



    useEffect(() => {
        const loadCart = async () => {
            try {
                await loadMyOrder()
                setBeforeOrders(orders)
                setOrders([])
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

            if(beforeOrders.length > 0){
                beforeOrders.forEach((product) => combineItems(product, copyOrders))
                handleSetCart(copyOrders)
                setBeforeOrders([])
                
            }
            if(data?.myOrders[0]?.discountCoupons[0]?.couponPromotion){
                setCoupon(data?.myOrders[0]?.discountCoupons[0]?.couponPromotion)
            }
            setOrders(copyOrders)
            
        }
    }, [data])

    const addCoupon = async (couponInput) => {
        if(couponInput){
            try{
                const response = await setPromotion({variables:{record:[{promotionCode: couponInput}]}})
                setCoupon(response?.data?.setPromotion?.discountCoupons[0]?.couponPromotion)
            }
            catch (e){
                console.log(e.message)
            }
        } 
    }

    const removeCoupon = async () => {
        try{
            await setPromotion({variables:{record:[]}})
            setCoupon(null)
        }
        catch(e){
            console.log(e.message)
        }
    }

    const combineItems = (product, base) => {
        const { productId, quantity } = product
        const limit = product?.product?.quantity
        const index = base.findIndex((object) => object.productId === productId)
        const total = index > -1 ? base[index].quantity + quantity:0
        if( total > limit){
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

    const createCart = (product, id, amount) => {
        return {productId: id, quantity: amount, product} 
    }



    const ordersHandle = (product, amount, command) => {
        const { _id, quantity } = product
        const index = orders.findIndex((order) => order.productId === _id)
        const copyArr = [...orders]
        if(command === "Set"){
            setCarts(product, index, amount, _id, copyArr)
        }
        else if(command === "Add"){
            addCarts(product, index, amount, _id, quantity, copyArr)
        }
        
    }

    const addCarts = (product, index, amount, id, quantity, copyArr) => {
        const total = copyArr[index]?.quantity || 0
        if(index > -1 && amount > 0 && total < quantity){
            copyArr[index].quantity = copyArr[index].quantity + amount
        }
        else if(amount > 0 && index < 0 && total < quantity){
            copyArr.push(createCart(product, id, amount))
        }
        setOrdersHandle([...copyArr])
    }

    const setCarts = (product, index, amount, id, copyArr) => {
        const total = product?.quantity || 0
        if(index > -1 && amount > 0 && total >= amount){
            copyArr[index].quantity = amount
        }
        else if(index > -1 && amount === 0){
            copyArr.splice(index, 1)
        }
        else if(index < 0 && amount > 0){
            copyArr.push(createCart(product, id, amount))
        }
        setOrdersHandle([...copyArr])
    }



    const handleSetCart = async (carts) => {
        const delProduct = carts.map((cart) => {
            return {productId:cart.productId, quantity: cart.quantity}
        })
        console.log(delProduct)
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
        <OrderContext.Provider value={{orders:orders, addOrder: ordersHandle, removeCart, coupon, addCoupon, removeCoupon}}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => useContext(OrderContext)

export default OrderContext