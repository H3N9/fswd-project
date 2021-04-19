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
import MobileNavbar from '../components/navbar/mobileNavbar'

const Index = () => {
    const [isShowMenu, setIsShowMenu] = useState(false)

    return (
                <>
                    <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu}/>
                    <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu}/>
                    <ContentBox >
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/discount">
                                <DiscountPage />
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
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
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