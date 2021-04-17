import React, { useState } from 'react'
import styled from 'styled-components'
import BoxLink from '../components/btnNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Stephen from '../images/stephen.jpg'
import Modal from './modal'
import {useOrderContext} from '../pages/index'
import { Link } from 'react-router-dom'

const Navbar = ({setIsShowMenu, isShowMenu}) => {
    const [modal, setModal] = useState(false)
    const { order } = useOrderContext()
    const amount = order.length

    return (
        <>
        <Package>
            <div className="container">
            <NavigateBar>
                <Logo>
                    <Link to={`/`} onClick={() => setIsShowMenu(false)}>{"Home"}</Link>
                </Logo>
                <BoxBtn>      
                    <BoxLink title={"สินค้าใหม่"} link={"new"} main={""}  />
                    <BoxLink title={"สินค้าขายดี"} link={"best"} />
                    <BoxLink title={"สินค้าลดราคา"} link={"discount"} main={""}  />
                    <BoxLink title={"สินค้าแนะนำ"} link={"recommend"} main={""}  />     
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
                    <MobileMenuButton onClick={() => setIsShowMenu(!isShowMenu)} className={isShowMenu ? "active" : ""}>
                    </MobileMenuButton>
                </AccountBox>
            </NavigateBar>           
            </div>
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
    z-index: 1;
    background: #FFF;
    padding-top: 5px;
    box-shadow: 0 4px 2px -2px gray;
`
const AccountBox = styled.div`
    display: flex;
    align-items: center;

`
const NavigateBar = styled.div`
    /* padding: 5px 0; */
    background: white;
    display: flex;
    justify-content: space-between;
`

const BoxBtn = styled.div`
    display: flex;
    flex: 1;
    @media (max-width: 960px) {
        display: none;
    }
`

const Logo = styled.div`
    padding: 10px 0;
    a{
        font-weight: bold;
        font-size: clamp(28px, 7vmin, 42px);
        text-decoration: none;
        color: #111;
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
    position: absolute;
    background: #003cff;
    color: white;
    padding: 0px 6px 0px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -6px;
    right: 0px;
`

export default Navbar