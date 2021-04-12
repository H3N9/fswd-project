import React from 'react'
import styled from 'styled-components'
import {Title, TitleText, Box9p, SpaceBox} from '../styles/styleComponents'
import CardCart from '../components/cardCart'
import { useOrderContext } from '../pages/index'
import {Link} from 'react-router-dom'
import Summary from '../components/summary'

const Cart = () => {
    const { order, removeCart } = useOrderContext()
    const totle = order.length > 0 ? order.reduce((book1, book2) => book1 + (book2['price'] - book2['discount']), 0):0
    return (
        <Box9p>
            <SpaceBox />
            <Title>
                <TitleText>ตระกร้าสินค้า</TitleText>
            </Title>
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
                        {order.map((book, index) => (<CardCart key={index} book={book}/>))}
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
`

const CartInfo = styled.div`
    width: clamp(700px, 70%, 1000px);
`
const HeadTable = styled.div`
    width: 100%;
    border-bottom: solid 3px gray;
    display: flex;
`
const HeadTitle = styled.div`
    width: 40%;
    padding-bottom: 10px;
`
const HeadText = styled.div`
    width: 20%;
    padding-bottom: 10px;
`

const CartSummary = styled.div`
    width: clamp(500px, 30%, 500px);
`
const TextCartInfo = styled.h3`
    margin: 0;
`

const OrderBookBox = styled.div`
    width: 95%;
    padding: 2.5%;

`

const ButtonBox = styled.div`
    border-top: solid 3px gray;
    display: flex;
    padding-top: 20px;
    
`
const Button = styled.button`
    padding: 5px 60px 5px 60px;
    border-radius: 20px;
    font-size: 1.2em;
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