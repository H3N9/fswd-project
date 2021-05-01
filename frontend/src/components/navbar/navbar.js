import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import BoxLink from './btnNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import logo from '../../images/logo.webp'
import Modal from './modal'
import {useOrderContext} from '../../context/orderContext'
import { Link, Route, Switch, NavLink } from 'react-router-dom'
import Orders from '../../pages/admin/orders'
const Navbar = ({setIsShowMenu, isShowMenu, isAdmin, user}) => {
    const [modal, setModal] = useState(false)
    const { orders } = useOrderContext()
    const amount = orders.reduce((val1, val2) => val1 + (val2.quantity || 0), 0)
    const cart = useRef()

    const IsAdmin = () => {
        if(isAdmin){
            return(
                <>
                    <BoxLink title={"โปรโมชั่น"} link={"promotions"} main={""}  /> 
                    <BoxLink title={"สินค้าทั้งหมด"} link={"products"} main={""}  />
                    <BoxLink title={"ประวัติการสั่งซื้อ"} link={"customer/orders"} main={""}  />
                    <Dropdown>
                        <p className="menu-button" >จัดการ <FontAwesomeIcon icon={['fas', 'sort-down']} style={{marginBottom: 2}}/></p>
                        <div className="menu">
                            <div className="menu-items">
                                <NavLink exact activeStyle={{ background: "#FFF", color: "#222", padding: "0 10px", borderRadius: 5, transition: 0 }}  to={`/admin/orders`}>ออเดอร์</NavLink>
                            </div>
                            <div className="menu-items">
                                <NavLink exact activeStyle={{ background: "#FFF", color: "#222", padding: "0 10px", borderRadius: 5, transition: 0 }}  to={`/admin/products`}>สินค้า</NavLink>
                            </div>
                            <div className="menu-items">
                                <NavLink exact activeStyle={{ background: "#FFF", color: "#222", padding: "0 10px", borderRadius: 5, transition: 0 }}  to={`/admin/promotions`}>โปรโมชั่น</NavLink>
                            </div>
                            <div className="menu-items">
                                <NavLink exact activeStyle={{ background: "#FFF", color: "#222", padding: "0 10px", borderRadius: 5, transition: 0 }}  to={`/admin`}>Dashboard</NavLink>
                            </div>             
                        </div>
                    </Dropdown>
                </>
            )
        }
        else{
            return (
                <>
                    <BoxLink title={"โปรโมชั่น"} link={"promotions"} main={""}  /> 
                    <BoxLink title={"สินค้าทั้งหมด"} link={"products"} main={""}  />
                    <BoxLink title={"ประวัติการสั่งซื้อ"} link={"customer/orders"} main={""}  /> 
                </>
            )
        }
    }

    const IsUser = () => {
        if(user){
            return (
                <>
                    <BoxButton className="img-profile">
                        <FontAwesomeIcon icon={['fas', 'user']} />
                        {/* <Image src={Stephen} /> */}
                    </BoxButton>
                    <AuthContainer>
                        <Link to={`/register`} className="logout-button">ออกจากระบบ</Link>
                    </AuthContainer>
                </>
            )
        }
        else{
            return (
                <AuthContainer>
                    <Link to={`/login`} >เข้าสู่ระบบ</Link>
                    <Link to={`/register`}>ลงทะเบียน</Link>
                </AuthContainer>  
            )
        }
    }

    return (
        <>
        <Package>
                <BoxBtn>
                    <Logo>        
                        <Link to={`/`} onClick={() => setIsShowMenu(false)}>
                            <img src={logo} alt="" width="10px"/>
                        </Link>
                    </Logo>    
                    <IsAdmin />
                </BoxBtn>  
                <AccountBox>

                    <BoxButton ref={cart} className="cart" onClick={() => setModal(!modal)}>
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                        <Circle>{amount}</Circle>
                    </BoxButton>

                    <Link className="cart-mobile" to={`/cart`} onClick={() => setIsShowMenu(false)}>
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                        <Circle className="circle">{amount}</Circle>
                    </Link>
                    <IsUser />
                    
                    <MobileMenuButton onClick={() => setIsShowMenu(!isShowMenu)} className={isShowMenu ? "active" : ""} />
                </AccountBox>        
        </Package>
        <Modal modal={modal} setModal={setModal} parent={cart}/>    
        <Switch>
            <Route path="admin/orders" render={() => <Orders/>}/>
        </Switch>
        </>
    )
}

const Package = styled.div`
    width: calc(100% + 9px);
    position: fixed;
    top: 0;
    z-index: 12;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background: #FFF;

`

const AccountBox = styled.div`
    display: flex;
    align-items: center;
    padding-right: 2.5vmin;
    .cart-mobile{
        position: relative;
        margin: 0 15px;
        font-size: 1.25rem;
        display: none;
        svg{
            color: #111;
        }
        .circle{
            border-radius: 50%;
            min-width: 30px;
            top: -18px;
            right: -22px;

        }
        @media (max-width: 960px){
            display: initial;
        }
    }
`

const BoxBtn = styled.div`
    padding-left: 20px;
    display: flex;
    align-items:center;
    
`

const Logo = styled.div`
    padding-top: 5px;
    margin-right: 20px;
    img{
        width: 100%;
        max-width: 62px;
        border-radius: 10px;
    }
`

const MobileMenuButton = styled.button`
   @media (max-width: 960px) {
        display: flex;
    }
    &.active{
        &::before{
            transform: translateY(0px) rotate(45deg);
            box-shadow: 0 0 0 #fff;
        }
        &::after{
            transform: translateY(0px) rotate(-45deg);
        }
    }
    background: transparent;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border: none;
    display: none;
    justify-content: center;
    align-items: center;
    &::before{
       content: "";
        position: absolute;
        width: 30px;
        height: 3px;
        background: #111;
        transition: 0.25s;
        transform: translateY(-10px);
        box-shadow: 0 10px 0 #111;
    }
    &::after{
        content: "";
         position: absolute;
         width: 30px;
         height: 3px;
         background: #111;
         transition: 0.25s;
         transform: translateY(10px);
     }

`
const BoxButton = styled.div`
    width: 50px;
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    svg{
        font-size: 20px;
    }
    &.img-profile{
        background-image: linear-gradient(120deg, #5128e6 , #2891e6);
        border-radius: 50%;
        display: flex;
        color: rgba(255,255,255, 0.9);
        font-weight: 500;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        margin: 0 7px;
    }
    img{
        position: absolute;
    }
    &.cart{
        @media (max-width: 960px){
            display: none;
        }
    }
`
const Image = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Circle = styled.div`
    border-radius: 50%;
    min-width: 24px;
    min-height: 10px;
    position: absolute;
    background: #ca2828;
    color: white;
    padding: 0px 6px 0px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -6px;
    right: 0px;
`
const AuthContainer = styled.div`
    display: flex;
    a{
        text-decoration: none;
        margin: 0 7px;
        padding: 5px 10px;
        border-radius: 5px;
        font-weight: 500;
        transition: 0.25s;
        &:first-child{
            color: #4447f3;
            border: 2px solid #4447f3;
        }
        &:last-child{
            color: #FFF;
            background: #4447f3;
            border: 2px solid #4447f3;
        }
        &.logout-button{
            color: #b61f1f;
            background: #FFF;
            border: 2px solid #b61f1f;
            :hover{
                color: #FFF;
                background: #b61f1f;
            }
        }
        @media (max-width: 960px) {
            display: none;

        }
    }
`

const Dropdown = styled.div`
    position: relative;
    
    p{
        cursor: pointer;
        margin-left: 0px;
        padding: 0 10px;
        transition: 0.25s;
        font-size: 1.1rem;
        position: relative;
        ::before{
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 25px;
            border-radius: 5px 5px 0 0;
            background: rgba(0,0,0,0.75);
            -webkit-backdrop-filter-: blur(5px); 
            backdrop-filter: blur(5px); 
            z-index: -100;
            transition: 0.25s;
        }
        :hover::before{
            width: 100%;
        }
        :hover{
            color: #FFF;
        }     
    }
    .menu{
        width: 450px;
        padding: 15px;
        border-radius: 0 5px 5px 5px;
        background: rgba(0,0,0,0.75);
        -webkit-backdrop-filter-: blur(5px); 
        backdrop-filter: blur(5px); 
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: 0.25s;
        position: absolute;
        bottom: -61px;
        left: -1px;
        display: none;
        justify-content:flex-start;
        .menu-items{
            padding: 10px 5px;
            flex-shrink: 0;
            a{
                width: 100%;
                text-decoration: none;
                color: #FFF;
                border-radius: 5px;
                font-weight: 500;
                font-size: 1.2rem;
                transition: 0.25s;
                margin: 0 5px;
                padding: 0 10px;
                position: relative;
                :hover{
                    background: #FFF;
                    color: #222;
                }     
            }      
        }
    }
    &:hover .menu{
        display: flex;
    }
    &:hover p.menu-button{
        color: #FFF;
        ::before{
            width: 100%;
        }
    }
    @media (max-width: 960px){
        display: none;
    }
`
export default Navbar