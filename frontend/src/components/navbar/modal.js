import React from 'react'
import styled from 'styled-components'
import {Button} from '../../styles/styleComponents'
import {Link} from 'react-router-dom'
import {useOrderContext} from '../../context/orderContext'


const Modal = () => {
    const { order } = useOrderContext()

    const renderBook = (product) => {
        return (
            <Pack>
                <AmountBox>
                    {"1x"}
                </AmountBox>
                <ImageOrder src={product?.image} />
                <TitleOrder>
                    {product?.title}
                </TitleOrder>
            </Pack>
        )
    }

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
                    {order.map((product) => renderBook(product))}
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
    top: 90px;
    right: -10px;
    z-index: 30;
    margin-right: 5%;
    padding: 10px 0;
    flex-direction: column;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    border-radius: 5px;
    background: #EFEFEF;
`
const BoxCover = styled.div`
    width: 100%;

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
    background-color: #EFEFEF;
    border: solid 2px #003cff;
    width: 255px;
    color: #003cff;
    :hover{
        background-color: #003cff;
        color: #EFEFEF;
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
    overflow-y: scroll;
    margin: 10px 0 10px 0;
    display: flex;
    flex-direction: column;
`

const Pack = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`
const AmountBox = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ImageOrder = styled.img`
    padding: 2.5%;
    width: 20%;
    height: 80px;
    object-fit: cover;
`

const TitleOrder = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`


export default Modal