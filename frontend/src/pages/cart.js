import React, { useState } from 'react'
import styled from 'styled-components'
import { Box9p, SpaceBox, Header} from '../styles/styleComponents'
import CardCart from '../components/cart/cardCart'
import { useOrderContext } from '../context/orderContext'
import {Link, useHistory} from 'react-router-dom'
import Summary from '../components/cart/summary'
import {Input} from '../styles/styleComponents'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const Cart = () => {
    const { orders, removeCart, addOrder, coupon, removeCoupon, addCoupon } = useOrderContext()
    const total = orders.length > 0 ? orders.reduce((v1, v2) => v1 + (v2.product.netPrice * v2.quantity) || 0, 0):0
    const [couponInput, setCouponInput] = useState("")
    const [error , setError ] = useState(false)
    const history = useHistory()

    const handleCoupon = (discountValue, method) => {
        if(method === "PERCENT"){
            return total*((100-discountValue)/100)
        }
        else if(method === "DISCOUNT"){
            return total-discountValue
        }
    }

    const netPrice = handleCoupon(coupon?.discountValue, coupon?.method) || total


    const inputHandle = (e) => {
        setCouponInput(e.target.value)
    }

    const CouponBox = () => {
        if(coupon){
            setError(false)
            return (
                <Coupon>
                    <h1>Coupon: {coupon?.promotionCode}</h1>
                    <DelCoupon onClick={() => removeCoupon()} >
                        <FontAwesomeIcon icon={['fas', 'times']}/>
                    </DelCoupon>
                </Coupon>
            )
        }
        else{
            return (
               <></>
            )
        }
    }

    const summaryHandle = () => {
        history.push('/checkout')
    }

    const add = () =>{
        if(!coupon){
            setError(true)
        }
        addCoupon(couponInput)
    }
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

                    <CouponBox />
                    
                    <BoxInput style={{display: coupon? "none":""}}>
                        <BoxInputBut>
                            <Input>
                                <input id="coupon" name="coupon" value={couponInput} onChange={inputHandle} required />
                                <label htmlFor="coupon">เพิ่มคูปองส่วนลด</label>
                            </Input>
                            {error ? <Error>โค้ดส่วนลดไม่ถูกต้อง</Error> : null}
                        </BoxInputBut>
                        
                        <AddBut onClick={() => add()}>
                            เพิ่ม
                        </AddBut>
                    </BoxInput>

                    <ButtonBox>
                        <Link to={"/"}>
                            <ButtonAdd>ซื้อสินค้าต่อไป</ButtonAdd>
                        </Link>
                        <ButtonDel onClick={() => removeCart()}>ล้างตระกร้าสินค้า</ButtonDel>
                    </ButtonBox>

                    

                </CartInfo>

                <CartSummary>
                    <Summary total={total} netPrice={netPrice} handle={summaryHandle}/>
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
    justify-content: space-around;
    
`

const CartInfo = styled.div`
    width: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px 0 20px;
    
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
const Error = styled.div`
    text-align:center;
    width: 100%;
    background: #ca2828;
    border-radius: 5px;
    padding: 10px 0;
    color: #FFF;
`
const ButtonBox = styled.div`
    display: flex;
    width: 100%;
    padding-top: 20px;
    justify-content: center;
    a{
        width: 150px;
    }
    
`
const Button = styled.button`
    flex: 1;
    max-width: 200px;
    height: 50px;
    border-radius: 5px;
    font-size: clamp(1rem, 5vmin,1.2rem);
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
    height: 40px;
    border: none;
    font-weight: 500;
    font-size: 17px;
    color: #FFF;
    background:#5128e6;
    margin-left: 10px;
    transition: 0.5s;
    border: 3px solid #5128e6;
    :hover {
        color: #5128e6;
        background-color: #FFF;
    }
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
const Coupon = styled.div`
    width: clamp(150px, 100%, 400px);
    height: 100px;
    margin: 30px;
    display: flex;
    align-items: center;
    background-image: linear-gradient(120deg,  #fa8d45, #fc6d0e);
    color: white;
    border-radius: 15px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    padding: 10px;
`

const DelCoupon = styled.div`
    width: 50px;
    height: 50px;
    background: red;
    border-radius: 50%;
    position: absolute;
    top: -20%;
    right: -5%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 3px red;
    transition: 0.5s;
    :hover {
        color: red;
        background-color: white;
    }
`

export default Cart