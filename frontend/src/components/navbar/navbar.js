import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BoxLink from './btnNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import logo from '../../images/logo.webp'
import Modal from './modal'
import {useOrderContext} from '../../context/orderContext'
import { Link, Route, Switch } from 'react-router-dom'

import Orders from '../../pages/admin/orders'
const Navbar = ({setIsShowMenu, isShowMenu, isAdmin, user}) => {
    const [modal, setModal] = useState(false)
    const { orders } = useOrderContext()
    const amount = orders.reduce((val1, val2) => val1 + (val2.quantity || 0), 0)

    const IsAdmin = () => {
        if(isAdmin){
            return(
                <>
                    <BoxLink title={"ออเดอร์"} link={`admin/orders`} main={""}  /> 
                    <BoxLink title={"สินค้า"} link={`admin/products`} main={""}  /> 
                    <BoxLink title={"โปรโมชั่น"} link={`admin/promotions`} main={""}  /> 
                    <BoxLink title={"Dashboard"} link={`admin`} main={""}  />
                </>
            )
        }
        else{
            return (
                <>
                    <BoxLink title={"โปรโมชั่น"} link={"promotions"} main={""}  /> 
                     <BoxLink title={"สินค้าทั้งหมด"} link={"products"} main={""}  />  
                </>
            )
        }
    }

    const IsUser = () => {
        if(user){
            return (
                <BoxButton className="img-profile">
                    <FontAwesomeIcon icon={['fas', 'user']} />
                    {/* <Image src={Stephen} /> */}
                </BoxButton>
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
                    <BoxButton>
                        <FontAwesomeIcon icon={['fas', 'search']} />
                    </BoxButton>
                    <BoxButton className="cart" onClick={() => setModal(!modal)}>
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                        <Circle>{amount}</Circle>
                    </BoxButton>
                    <IsUser />
                    
                    <MobileMenuButton onClick={() => setIsShowMenu(!isShowMenu)} className={isShowMenu ? "active" : ""} />
                </AccountBox>        
        </Package>
        <Modal modal={modal}/>    
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
    .cart{
        @media (max-width: 960px) {
            display: none;
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
    background-color: white;
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
    background: #2891e6;
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
        &:first-child{
            color: #2891e6;
            border: 2px solid #2891e6;
        }
        &:last-child{
            color: #FFF;
            background: #2891e6;
            border: 2px solid #2891e6;
        }
        @media (max-width: 960px) {
            display: none;

        }
    }
`
export default Navbar