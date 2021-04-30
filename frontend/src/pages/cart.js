import React, { useEffect } from 'react'
import styled from 'styled-components'
import {Title, TitleText, Box9p, SpaceBox} from '../styles/styleComponents'
import CardCart from '../components/cart/cardCart'
import { useOrderContext } from '../context/orderContext'
import {Link} from 'react-router-dom'
import Summary from '../components/cart/summary'

const Cart = () => {
    const { orders, removeCart, addOrder } = useOrderContext()
    const totle = orders.length > 0 ? orders.reduce((v1, v2) => v1 + (v2.product.netPrice * v2.quantity) || 0, 0):0

    return (
        <Box9p>
            <SpaceBox />
            <Title>
                <TitleText>ตระกร้าสินค้า</TitleText>
            </Title>
            <CartBox>

                <CartInfo>

                    <OrderBookBox>
                        {orders.map((product, index) => (<CardCart key={index} addOrder={addOrder} product={product?.product || {}} quantity={product.quantity}/>))}
                    </OrderBookBox>

                    <ButtonBox>
                        <Link to="/">
                            <ButtonAdd>ซื้อสินค้าต่อไป</ButtonAdd>
                        </Link>
                        <ButtonDel onClick={() => removeCart()}>ล้างตระกร้าสินค้า</ButtonDel>
                    </ButtonBox>

                    <BoxInput>

                    </BoxInput>

                </CartInfo>

                <CartSummary>
                    <Summary totle={totle} />
                </CartSummary>



            </CartBox>
            <SpaceBox />
        </Box9p>
    )
}
const CartBox = styled.div`
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
`

const CartInfo = styled.div`
    width: clamp(700px, 70%, 1000px);
`
const BoxInput = styled.div`
    width: 100%;
    height: 100px;
`

const CartSummary = styled.div`
    width: clamp(500px, 30%, 500px);
`

const OrderBookBox = styled.div`
    width: 95%;
    padding: 2.5%;

`

const ButtonBox = styled.div`
    display: flex;
    width: 100%;
    padding-top: 20px;
    min-height: 100px;
    justify-content: center;
    flex-wrap: wrap;
    
`
const Button = styled.button`
    width: 200px;
    height: 50px;
    border-radius: 20px;
    font-size: 1.2em;
    outline: none;
    cursor: pointer;
    transition: 0.5s;
    margin: 10px;
`

const ButtonAdd = styled(Button)`
    background-color: white;
    border: solid 2px gray;
    color: gray;

    :hover{
        background-color: gray;
        border: solid 2px gray;
        color: white;
    }
`

const ButtonDel = styled(Button)`
    background-color: black;
    border: solid 2px black;
    color: white;
    margin-left: 10px;
    :hover{
        background-color: white;
        border: solid 2px black;
        color: black;
    }
`


export default Cart