import React, {useState} from 'react'
import styled from 'styled-components'
import {Route, Switch} from 'react-router-dom'
import NavBar from '../components/navbar/navbar'

import Cart from './cart'
import Home from './home'
import Login from './login'
import Detail from './detail'
import Payment from './payment'
import Register from './register'
import AllProducts from './allProduct'
import DiscountPage from './discountPage'
import UpdateProduct from './admin/updateProduct'
import PromotionDetail from './admin/promotionDetail'
import MobileNavbar from '../components/navbar/mobileNavbar'

import Order from './admin/order'
import Orders from './admin/orders'
import Products from './admin/products'
import Dashboard from './admin/dashboard'
import Promotions from './admin/promotions'
import CreateProduct from './admin/createProduct'

const Index = () => {
    const [isShowMenu, setIsShowMenu] = useState(false)
    return (
            <>             
                <ContentBox >   
                    <Switch>
{/* --------------------------------------------- For User ----------------------------------------------------  */}
                        <Route exact path="/">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <Home />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/discount">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <DiscountPage />
                        </Route>
                        <Route path="/product/:productSlug">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <Detail />
                        </Route>
                        <Route path="/cart">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <Cart />
                        </Route>
                        <Route path="/payment">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <Payment />
                        </Route>
                        <Route path="/products">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <AllProducts />
                        </Route>

{/* --------------------------------------------- For Admin ----------------------------------------------------  */}
                        <Route path="/admin/product/create">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <CreateProduct />
                        </Route>
                        <Route path="/admin/orders">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <Orders />                  
                        </Route> 
                        <Route path="/admin/promotions">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <Promotions />
                        </Route>
                        <Route path="/admin/promotion/:promotionId">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <PromotionDetail />
                        </Route>
                        <Route path="/admin/products">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <Products />
                        </Route>
                        <Route path="/admin/product/:productId">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <UpdateProduct />
                        </Route>
 
                        <Route path="/admin/order/:orderId">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <Order />
                        </Route>     
                        <Route path="/admin/">
                            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                            <Dashboard />
                        </Route>             
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