import React, { useState } from 'react'
import styled from 'styled-components'
import BoxLink from '../components/btnNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Stephen from '../images/stephen.jpg'
import Modal from './modal'
import {useOrderContext} from '../pages/index'


const Navbar = () => {
    const [modal, setModal] = useState(false)
    const { order } = useOrderContext()
    const amount = order.length

    return (
        <>
        <Package>
            <NavigateBar>
                <BoxBtn>
                    <BoxLink title={"Book"} link={""} main={"mainBox"} />
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
                </AccountBox>
            </NavigateBar>
            <ShadowBottom />
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
    z-index: 2;
`
const AccountBox = styled.div`
    display: flex;
    margin-right: 5%;
    align-items: center;

`
const NavigateBar = styled.div`
    width: 100%;
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
`

const BoxBtn = styled.div`
    margin-left: 5%;
    display: flex;
    flex-direction: row;
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

const ShadowBottom = styled.div`
    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,0.4150035014005602) 0%, rgba(0,0,0,0) 100%); 
    height: 5px;
    width: 100%;
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