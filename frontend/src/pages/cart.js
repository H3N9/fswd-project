import React, { useEffect } from 'react'
import styled from 'styled-components'
import {Title, TitleText, Box9p, SpaceBox, Header} from '../styles/styleComponents'
import CardCart from '../components/cart/cardCart'
import { useOrderContext } from '../context/orderContext'
import {Link} from 'react-router-dom'
import Summary from '../components/cart/summary'
import {Input} from '../styles/styleComponents'


const Cart = () => {
    const { orders, removeCart, addOrder } = useOrderContext()
    const total = orders.length > 0 ? orders.reduce((v1, v2) => v1 + (v2.product.netPrice * v2.quantity) || 0, 0):0

    return (
        <Box9p>
            <SpaceBox />
            <Header>
                <h1>ตระกร้าสินค้า</h1>
            </Header>
            <CartBox>

                <CartInfo>

                    <OrderBookBox>
                        {orders.map((product, index) => (<CardCart key={index} addOrder={addOrder} product={product?.product || {}} quantity={product.quantity}/>))}
                    </OrderBookBox>

                    <BoxInput>
                        <BoxInputBut>
                            <Input>
                                <input id="coupon" name="coupon" />
                                <label htmlFor="coupon">คูปอง</label>
                            </Input>
                        </BoxInputBut>
                        
                        <AddBut>
                            เพิ่ม
                        </AddBut>
                    </BoxInput>

                    <ButtonBox>
                        <Link to="/">
                            <ButtonAdd>ซื้อสินค้าต่อไป</ButtonAdd>
                        </Link>
                        <ButtonDel onClick={() => removeCart()}>ล้างตระกร้าสินค้า</ButtonDel>
                    </ButtonBox>

                    

                </CartInfo>

                <CartSummary>
                    <Summary total={total} />
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
    width: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
const BoxInput = styled.div`
    width: clamp(150px, 100%, 400px);
    height: 100px;
    margin: 30px;
    display: flex;
    align-items: center;
`

const CartSummary = styled.div`
    flex: 1;
    max-width: 500px;
    width: 100%;
    min-width: 300px;
    
    margin-left: 0px;
    /* margin: 0 auto; */
`

const OrderBookBox = styled.div`
    width: 100%;
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

const AddBut = styled.button`
    width: 30%;
    height: 60px;
`
const BoxInputBut = styled.div`
    width: 70%;
    height: 100%;
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