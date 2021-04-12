import React, { useState } from 'react'
import styled from 'styled-components'
import {SpaceBox, Box9p} from '../styles/styleComponents'
import Summary from '../components/summary'
import {useOrderContext} from './index'
import InputDouble from '../components/InputDouble'
import InputLong from '../components/InputLong'
import Select from '../components/select'
import InputRadio from '../components/InputRadio'


const Payment = () => {
    const { order } = useOrderContext()
    const totle = order.length > 0 ? order.reduce((book1, book2) => book1 + (book2['price'] - book2['discount']), 0):0
    const [ shipping, setShipping ] = useState("")
    const [paid, setPaid ] = useState("")
    
    const setShipingHandle = (text) => {
        setShipping(text)
    }

    const setPaidHandle = (text) => {
        setPaid(text)
    }

    return (
        <Box9p>
            <SpaceBox />
            <SpaceBox />
            <BoxPayment>
                <PaymentInputBox>
                    <TitlePayment>
                        ชำระเงิน
                    </TitlePayment>
                    <TextWline>
                        ที่อยู่ในการจัดส่ง
                    </TextWline>
                    <LineBreak />
                    <InputDouble text1={"ชื่อ"} text2={"นามสกุล"} />
                    <Select text={"ประเทศ"} />
                    <InputLong text={"ที่อยู่"} behind={"(บ้านเลขที่ / หมู่บ้าน / หมู่ที่ / ซอย / ถนน)"} command={"red"} type={"text"} />
                    <InputDouble text1={"แขวง/ตำบล"} text2={"เขตอำเภอ"} />
                    <InputDouble text1={"จังหวัด"} text2={"รหัสไปรษณีย์"} />
                    <InputLong text={"เบอร์ติดต่อ"} behind={"(กรุณาระบุหมายเลขโทรศัพท์ เฉพาะตัวเลขเท่านั้น)"} type={"number"}/>
                    <SpaceBox />
                    <TextWline>
                        เลือกขนส่ง
                    </TextWline>
                    <LineBreak />

                    <InputRadio text={"Free Shipping"} state={shipping} handle={setShipingHandle} />
                    <InputRadio  text={"Kerry Express"} state={shipping} handle={setShipingHandle} />  

                    <SpaceBox />
                    <TextWline>
                        วิธีชำระเงิน
                    </TextWline>
                    <LineBreak />

                    <InputRadio text={"Cash"} state={paid} handle={setPaidHandle} />
                    <InputRadio  text={"Credit/Debit"} state={paid} handle={setPaidHandle} />  


                </PaymentInputBox>
                <CartSummary>
                    <Summary totle={totle} />
                </CartSummary>
            </BoxPayment>
            
            <SpaceBox />
        </Box9p>
    )
}

const BoxPayment = styled.div`
    display: flex;
    width: 100%;
`
const PaymentInputBox = styled.div`
    width: clamp(700px, 70%, 1000px);
    display: flex;
    flex-direction: column;
`
const CartSummary = styled.div`
    width: clamp(500px, 30%, 500px);
    margin-left: 50px;
`
const TitlePayment = styled.h1`
    margin: 20px 0 20px 0;

`
const TextWline = styled.h3`
    margin: 20px 0 10px 0;
`
const LineBreak = styled.div`
    width: 100%;
    height: 3px;
    background-color: gray;
`

export default Payment