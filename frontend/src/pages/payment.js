import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { SHIPPINGS } from '../graphql/shippingQuery'
import {SpaceBox, Box9p} from '../styles/styleComponents'
import Summary from '../components/cart/summary'
import {useOrderContext} from '../context/orderContext'
import InputDouble from '../components/payment/InputDouble'
import InputLong from '../components/payment/InputLong'
import Select from '../components/payment/select'
import InputRadio from '../components/payment/InputRadio'


const Payment = () => {
    const { orders } = useOrderContext()
    const totle = orders.length > 0 ? orders.reduce((book1, book2) => book1 + (book2['price'] - book2['discount']), 0):0
    const { data } = useQuery(SHIPPINGS)

    const [ address, setAddress ] = useState({
        addressInfo: '',
        subDistrict: '',
        district: '',
        province: '',
        country: 'ไทย',
        postalCode: '',
        phoneNumber: ''
    })
    const [addressSelect, setAddressSelect] = useState(-1)
    const [ addresses, setAddresses ] = useState([])
    const [ shipping, setShipping ] = useState("")
    const [ paid, setPaid ] = useState("")

    useEffect(() => {
        if (data?.shippings.length > 0){
            setAddressSelect(0)
            setAddresses(data.shippings)
            setAddress({
                ...data.shippings[0],
                addressInfo: data.shippings[0].address
            })
        }

    }, [data])
    
    const setShipingHandle = (text) => {
        setShipping(text)
    }

    const setPaidHandle = (text) => {
        setPaid(text)
    }

    const addressSelectHandle = useCallback((e) => {
        const index = e.target.value
        setAddressSelect(index)
        if (index >= 0){
            setAddress({
                ...addresses[index],
                subDistrict: addresses[index].subDistrict || '',
                district: addresses[index].district || '',
                addressInfo: addresses[index].address
            })
        }
    })

    const addressHandle = (e) => {
        const { name, value } = e.target
        setAddress({
            ...address,
            [name]: value
        })
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
                        {"ที่อยู่ในการจัดส่ง"}
                        <select onChange={addressSelectHandle} >
                            {addresses.map((item, index) => {
                                if (index === 0)
                                    return (<option key={item._id} value={index} selected={"selected"}>{item.address}</option>)
                                else
                                    return (<option key={item._id} value={index}>{item.address}</option>)
                            })}
                            <option value={-1} >เพิ่มที่อยู่</option>
                        </select>
                    </TextWline>
                    <LineBreak />
                    {/*<Select text={"ประเทศ"} />*/}
                    <InputLong text={"ที่อยู่"} behind={"(บ้านเลขที่ / หมู่บ้าน / หมู่ที่ / ซอย / ถนน)"} 
                    command={"red"} type={"text"} name={"addressInfo"} value={address.addressInfo} handle={addressHandle}/>
                    <InputDouble text1={"แขวง/ตำบล"} text2={"เขตอำเภอ"} 
                    name1={"subDistrict"} value1={address.subDistrict} name2={"district"} value2={address.district} handle={addressHandle} />
                    <InputDouble text1={"จังหวัด"} text2={"รหัสไปรษณีย์"} 
                    name1={"province"} value1={address.province} name2={"postalCode"} value2={address.postalCode} handle={addressHandle}/>
                    <InputLong text={"เบอร์ติดต่อ"} behind={"(กรุณาระบุหมายเลขโทรศัพท์ เฉพาะตัวเลขเท่านั้น)"} type={"text"}
                    name={"phoneNumber"} value={address.phoneNumber} handle={addressHandle} />
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