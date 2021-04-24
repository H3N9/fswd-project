import React, { useState } from 'react'
import styled from 'styled-components'
import BoxLink from './btnNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Stephen from '../../images/stephen.jpg'
import logo from '../../images/logo.webp'
import Modal from './modal'
import {useOrderContext} from '../../context/orderContext'
import { Link } from 'react-router-dom'

const Navbar = ({setIsShowMenu, isShowMenu}) => {
    const [modal, setModal] = useState(false)
    const { orders } = useOrderContext()
    const amount = orders.reduce((val1, val2) => val1 + (val2.quantity || 0), 0)

    return (
        <>
        <Package>
                <BoxBtn>
                    <Logo>        
                        <Link to={`/`} onClick={() => setIsShowMenu(false)}>
                            <img src={logo} alt="" width="10px"/>
                        </Link>
                    </Logo>    
                    <BoxLink title={"สินค้าลดราคา"} link={"login"} main={""}  /> 
                </BoxBtn>  
                <AccountBox>
                    <BoxButton>
                        <FontAwesomeIcon icon={['fas', 'search']} />
                    </BoxButton>
                    <BoxButton onClick={() => setModal(!modal)}>
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                        <Circle>{amount}</Circle>
                    </BoxButton>
                    <BoxButton>
                        <Image src={Stephen} />
                    </BoxButton>
                    <MobileMenuButton onClick={() => setIsShowMenu(!isShowMenu)} className={isShowMenu ? "active" : ""} />
                </AccountBox>        
        </Package>
        {modal && (
            <Modal />
        )}
        </>
    )
}

const Package = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background: #FFF;
`

const AccountBox = styled.div`
    display: flex;
    align-items: center;
    padding-right: 2.5vmin;

`

const BoxBtn = styled.div`
    padding-left: 20px;
    display: flex;
    align-items:center;
`

const Logo = styled.div`
    padding-top: 5px;
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
`
const Image = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Circle = styled.div`
    border-radius: 50%;
    min-width: 10px;
    min-height: 10px;
    position: absolute;
    background: #3058db;
    color: white;
    padding: 0px 6px 0px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -6px;
    right: 0px;
`

export default Navbar