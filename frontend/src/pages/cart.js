import React, { useEffect } from 'react'
import styled from 'styled-components'
import {Title, TitleText, Box9p, SpaceBox, Header} from '../styles/styleComponents'
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
            <Header>
                <h1>ตระกร้าสินค้า</h1>
            </Header>
            <CartBox>

                <CartInfo>
                    <HeadTable>
                        <HeadTitle>
                            <TextCartInfo>สินค้า</TextCartInfo>
                        </HeadTitle>
                        <HeadText>
                            <TextCartInfo>ราคา</TextCartInfo>
                        </HeadText>
                        <HeadText>
                            <TextCartInfo>จำนวน</TextCartInfo>
                        </HeadText>
                        <HeadText>
                            <TextCartInfo>ยอดรวม</TextCartInfo>
                        </HeadText>
                    </HeadTable>

                    <OrderBookBox>
                        {orders.map((product, index) => (<CardCart key={index} addOrder={addOrder} product={product?.product || {}} quantity={product.quantity}/>))}
                    </OrderBookBox>

                    <ButtonBox>
                        <Link to="/">
                            <ButtonAdd>ซื้อสินค้าต่อไป</ButtonAdd>
                        </Link>
                        <ButtonDel onClick={() => removeCart()}>ล้างตระกร้าสินค้า</ButtonDel>
                    </ButtonBox>

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
    justify-content: space-between;
    @media (max-width: 1278px){
       justify-content: center;
    }
    
    
`

const CartInfo = styled.div`
    width: 850px;
    
`
const HeadTable = styled.div`
    width: 100%;
    border-bottom: solid 2px gray;
    display: flex;
`
const HeadTitle = styled.div`
    width: 40%;
    @media (max-width: 375px){
        width: 30%;
    }
    
`
const HeadText = styled.div`
    width: 20%;
    &:last-child{
        flex: 1;
    }
`

const CartSummary = styled.div`
    flex: 1;
    max-width: 500px;
    width: 100%;
    min-width: 300px;
    
    margin-left: 0px;
    /* margin: 0 auto; */
`
const TextCartInfo = styled.h3`
    margin: 10px 0;
    font-weight: 500;
    font-size: 1.25rem;
    text-align: center;
`

const OrderBookBox = styled.div`
    width: 100%;
`

const ButtonBox = styled.div`
    border-top: solid 2px gray;
    display: flex;
    padding: 20px 0;
    
`
const Button = styled.button`
    padding: 7px 25px;
    border-radius: 7px;
    font-size: clamp(0.9rem, 2vmin, 1.2rem);
    outline: none;
    cursor: pointer;
    transition: 0.5s;
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