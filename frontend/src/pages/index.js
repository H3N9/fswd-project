import React, {createContext, useContext, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from '../components/navbar'
import styled from 'styled-components'
import Home from './home'
import NewGoodsPage from './newGoodsPage'
import RecomPage from './recomPage'
import DiscountPage from './discountPage'
import BestSalePage from './bestSalePage'
import Detail from './detail'
import Cart from './cart'
import Login from './login'
import Register from './register'
import Payment from './payment'
import MobileNavbar from '../components/mobileNavbar'

const OrderContext = createContext()

const Index = () => {
    const [order, setOrder] = useState([])
    const [isShowMenu, setIsShowMenu] = useState(false)

    const addOrder = (newOrder) => {
        console.log(order)
        setOrder([...order, ...newOrder])
    }

    const removeCart = () => {
        setOrder([])
    }


    return (
            <Router>
                <OrderContext.Provider value={{order:order, addOrder, removeCart}}>
                    <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                    <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                    <ContentBox >
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/new">
                                <NewGoodsPage />
                            </Route>
                            <Route path="/best">
                                <BestSalePage />
                            </Route>
                            <Route path="/discount">
                                <DiscountPage />
                            </Route>
                            <Route path="/recommend">
                                <RecomPage />
                            </Route>
                            <Route path="/detail/:bookId">
                                <Detail />
                            </Route>
                            <Route path="/cart">
                                <Cart />
                            </Route>
                            <Route path="/payment">
                                <Payment />
                            </Route>
                        </Switch>
                    </ContentBox>
                </OrderContext.Provider>
            </Router>
        
    )
}

const ContentBox = styled.div`
    width: 100%;
    height: 100%;
`

export default Index


export const useOrderContext = () => useContext(OrderContext)