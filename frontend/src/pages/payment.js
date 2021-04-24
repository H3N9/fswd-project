import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client'
import { MY_SHIPPINGS } from '../graphql/shippingQuery'
import { CREATE_SHIPPING, UPDATE_SHIPPING } from '../graphql/shippingMutation'
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
    const { data } = useQuery(MY_SHIPPINGS)
    const [ createShipping ] = useMutation(CREATE_SHIPPING)
    const [ updateShipping ] = useMutation(UPDATE_SHIPPING)

    const [ address, setAddress ] = useState({
        address: '',
        subDistrict: '',
        district: '',
        province: '',
        postalCode: '',
        phoneNumber: ''
    })
    const [ addressSelect, setAddressSelect ] = useState(-1)
    const [ addresses, setAddresses ] = useState([])
    const [ shipping, setShipping ] = useState("")
    const [ paid, setPaid ] = useState("")

    useEffect(() => {
        if (data?.myShippings.length > 0){
            setAddressSelect(0)
            setAddresses(data.myShippings)
            setAddress({
                ...data.myShippings[0],
                address: data.myShippings[0].address
            })
        }

    }, [data])

    useEffect(() => {
        console.log(addresses)
    }, [addresses])
    
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
                address: addresses[index].address
            })
        }
        else{
            setAddress({
                address: '',
                subDistrict: '',
                district: '',
                province: '',
                postalCode: '',
                phoneNumber: ''
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

    const submitForm = useCallback( async (e) => {
        const objInput = {
            address: address.address,
            subDistrict: address.subDistrict,
            district: address.district,
            province: address.province,
            postalCode: address.postalCode,
            phoneNumber: address.phoneNumber
        }
        const index = Number(addressSelect)

        if (index === -1){
            try {
                const newShipping = await createShipping({ variables: { object: objInput } })
                setAddresses([...addresses, newShipping.data.createShipping.record])
                setAddressSelect(addresses.length)
            } catch (error) {
                console.log(error.message)
            }

        }
        else{
            try{
                console.log(objInput)
                const shipping = await updateShipping({ variables: { id: addresses[index]._id, object: objInput } })
                const addressesCopy = [...addresses]
                addressesCopy[index] = shipping.data.updateShippingById.record
                setAddresses(addressesCopy)
            } catch (error){
                console.log(error.message)
            }
        }
    })

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
                        <select onChange={addressSelectHandle} value={addressSelect} >
                            {addresses.map((item, index) => (<option key={item._id} value={index}>{item.address}</option>))}
                            <option value={-1} >เพิ่มที่อยู่</option>
                        </select>
                    </TextWline>
                    <LineBreak />
                    {/*<Select text={"ประเทศ"} />*/}
                    <InputLong text={"ที่อยู่"} behind={"(บ้านเลขที่ / หมู่บ้าน / หมู่ที่ / ซอย / ถนน)"} 
                    command={"red"} type={"text"} name={"address"} value={address.address} handle={addressHandle}/>
                    <InputDouble text1={"แขวง/ตำบล"} text2={"เขตอำเภอ"} 
                    name1={"subDistrict"} value1={address.subDistrict} name2={"district"} value2={address.district} handle={addressHandle} />
                    <InputDouble text1={"จังหวัด"} text2={"รหัสไปรษณีย์"} 
                    name1={"province"} value1={address.province} name2={"postalCode"} value2={address.postalCode} handle={addressHandle}/>
                    <InputLong text={"เบอร์ติดต่อ"} behind={"(กรุณาระบุหมายเลขโทรศัพท์ เฉพาะตัวเลขเท่านั้น)"} type={"text"}
                    name={"phoneNumber"} value={address.phoneNumber} handle={addressHandle} />
                    <button onClick={submitForm} >{(addressSelect >= 0?"แก้ไขที่อยู่จัดส่ง":"เพิ่มที่อยู่จัดส่ง")}</button>
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