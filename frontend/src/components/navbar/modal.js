import React from 'react'
import styled from 'styled-components'
import {Button} from '../../styles/styleComponents'
import {Link} from 'react-router-dom'
import {useOrderContext} from '../../context/orderContext'
import CardOrder from './cardOrder'

const Modal = () => {
    const { orders } = useOrderContext()

    return (
        <BoxModal>
            <BoxCover>
                <TitleBox>
                    <Title>ตระกร้าของฉัน</Title>
                </TitleBox>
                <OrderBox>
                    <OrderText>
                        สินค้าในตระกร้า
                    </OrderText>
                </OrderBox>
                <ButtonBox>
                    <Link to="/cart">
                        <ButtonOrder>ดูหรือแก้ไขสินค้า</ButtonOrder>
                    </Link>
                </ButtonBox>
            </BoxCover>
            <Underline />

            <BoxCover>
                <Order>
                    {orders.map((product) => (<CardOrder product={product} />))}
                </Order>
            </BoxCover>
            <Underline />
            <BoxCover>
                <OrderBox>
                    <OrderText>
                        สินค้าในตระกร้า
                    </OrderText>
                </OrderBox>
                <ButtonBox>
                    <Link to="/payment">
                        <ButtonOrder>ไปชำระเงิน</ButtonOrder>
                    </Link>
                    
                </ButtonBox>
            </BoxCover>

        </BoxModal>
    )
}

const BoxModal = styled.div`
    width: 320px;
    display: flex;
    position: fixed;
    top: 110px;
    right: 0;
    margin-right: 5%;
    flex-direction: column;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`
const BoxCover = styled.div`
    width: 100%;
    background-color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const TitleBox = styled.div`
    padding: 5px;
`
const Title = styled.h3`
    margin: 0;
    
`
const OrderText = styled.p`
    margin: 0;
`


const OrderBox = styled.div`
    padding: 5px;
`
const ButtonBox = styled.div`
    padding: 5px;
`
const ButtonOrder = styled(Button)`
    background-color: white;
    border: solid 3px #003cff;
    width: 255px;
    color: #003cff;
    :hover{
        background-color: #003cff;
        color: white;
    }

`
const Underline = styled.div`
    width: 100%;
    height: 2px;
    background-color: gray;
`
const Order = styled.div`
    width: 100%;
    height: 100px;
    background: white;
    overflow-y: scroll;
    margin: 10px 0 10px 0;
    display: flex;
    flex-direction: column;
`


export default Modal