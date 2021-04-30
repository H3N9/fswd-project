import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Route, Switch, useLocation} from 'react-router-dom'
import NavBarPack from '../components/navbarPack'
import {useSession} from '../context/session'

import Cart from './cart'
import Home from './home'
import Login from './login'
import Detail from './detail'
import Checkout from './checkout'
import MyOrder from './myOrder'
import Register from './register'
import AllProducts from './allProduct'
import AllPromotion from './allPromotion'
import MyOrderDetail from './myOrderDetail'



import DiscountPage from './discountPage'
import UpdateProduct from './admin/updateProduct'
import PromotionDetail from './admin/promotionDetail'


import Order from './admin/order'
import Orders from './admin/orders'
import Products from './admin/products'
import Dashboard from './admin/dashboard'
import Promotions from './admin/promotions'
import CreateProduct from './admin/createProduct'
import CreatePromotion from './admin/createPromotion.js'

const Index = () => {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const location = useLocation()
    const { user } = useSession()
    const [isUser, setIsUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const ignorePath = [
        "/login",
        '/register'
    ]

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        if(user?.isAdmin){
            setIsAdmin(true)
        }
        if(user){
            setIsUser(user)
        }
        else{
            setIsUser(false)
            setIsAdmin(false)
        }
    }, [user])

    const Admin = () => {
        if(user?.isAdmin){
            return (
                <>
                    <Route path="/admin/product/create">
                            <CreateProduct />
                        </Route>
                        <Route path="/admin/orders">
                            <Orders />                  
                        </Route> 
                        <Route path="/admin/promotions">
                            <Promotions />
                        </Route>
                        <Route path="/admin/promotion/create">
                                <CreatePromotion />
                            </Route> 
                        <Route path="/admin/promotion/:promotionId">
                            <PromotionDetail />
                        </Route>
                        <Route path="/admin/products">
                            <Products />
                        </Route>
                        <Route path="/admin/product/:productId">
                            <UpdateProduct />
                        </Route>
 
                        <Route path="/admin/order/:orderId">
                            <Order />
                        </Route>  
                        <Route exact path="/admin">
                            <Dashboard />
                        </Route> 
                </>
            )
        }
        else{
            return (
                <></>
            )
        }
    }

    return (
            <>             
                <ContentBox >   
                    <NavBarPack setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu} ignorePath={ignorePath} isAdmin={isAdmin} user={isUser} />
                    <Switch>
{/* --------------------------------------------- For User ----------------------------------------------------  */}
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        
                        <Route exact path="/">
                            <Home />
                        </Route>
                        
                        <Route path="/discount">
                            <DiscountPage />
                        </Route>
                        <Route path="/product/:productSlug">
                            <Detail />
                        </Route>
                        <Route path="/cart">
                            <Cart />
                        </Route>
                        <Route path="/checkout">
                            <Checkout />
                        </Route>
                        <Route path="/products">
                            <AllProducts />
                        </Route>
                        <Route path="/promotions">
                            <AllPromotion />
                        </Route>
                        <Route path="/customer/orders">
                            <MyOrder />
                        </Route>
                        <Route path="/customer/order/:orderId">
                            <MyOrderDetail />
                        </Route>

{/* --------------------------------------------- For Admin ----------------------------------------------------  */}
                          <Admin />
                                               
                    </Switch>
                </ContentBox>
             </>
    )
}

const ContentBox = styled.div`
    width: 100%;
    height: 100%;
`

export default Index