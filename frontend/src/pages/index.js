import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import NavBar from '../components/navbar/navbar'
import styled from 'styled-components'
import Home from './home'
import DiscountPage from './discountPage'
import Detail from './detail'
import Cart from './cart'
import Login from './login'
import Register from './register'
import Payment from './payment'
import CreateProduct from './admin/createProduct'
import MobileNavbar from '../components/navbar/mobileNavbar'
import Promotions from './admin/promotions'
import Promotion from './admin/promotion'
import Products from './admin/products'
import UpdateProduct from './admin/updateProduct'
import Orders from './admin/orders'
import Order from './admin/order'
const Index = () => {
    const [isShowMenu, setIsShowMenu] = useState(false)

    return (
                <>
                 
                    <ContentBox >
                        
                        <Switch>
                        
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
                            <Route path="/detail/:bookId">
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
                            <Route path="/admin/product/create">
                                <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                                <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                                <CreateProduct />
                            </Route>
                            <Route path="/admin/promotions">
                                <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                                <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                                <Promotions />
                            </Route>
                            <Route path="/admin/promotion/:promotionId">
                                <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                                <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                                <Promotion />
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
                            <Route path="/admin/orders">
                                <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                                <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                                <Orders />
                            </Route>  
                            <Route path="/admin/order/:orderId">
                                <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                                <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                                <Order />
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