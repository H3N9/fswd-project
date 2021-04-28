import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client'
import { MY_SHIPPINGS } from '../graphql/shippingQuery'
import { CREATE_SHIPPING, UPDATE_SHIPPING } from '../graphql/shippingMutation'
import {SpaceBox, Box9p, Header} from '../styles/styleComponents'
import Summary from '../components/cart/summary'
import {useOrderContext} from '../context/orderContext'
import InputDouble from '../components/payment/InputDouble'
import InputLong from '../components/payment/InputLong'
import Select from '../components/payment/select'
import InputRadio from '../components/payment/InputRadio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <BoxPayment>
                <PaymentInputBox>
                    <Header>
                        <h1>ชำระเงิน</h1> 
                    </Header>
                    <TextWline>
                        {"ที่อยู่ในการจัดส่ง "}
                        <select className="select-address" onChange={addressSelectHandle} value={addressSelect} >
                            {addresses.map((item, index) => (<option key={item._id} value={index}>{item.address}</option>))}
                            <option value={-1} >เพิ่มที่อยู่</option>
                        </select>
                    </TextWline>
                    {/*<Select text={"ประเทศ"} />*/}
                    <InputLong text={"ที่อยู่"} behind={"(บ้านเลขที่ / หมู่บ้าน / หมู่ที่ / ซอย / ถนน)"}  command={"red"} type={"text"} name={"address"} value={address.address} handle={addressHandle}/>
                    
                    <InputDouble text1={"แขวง/ตำบล"} text2={"เขตอำเภอ"} name1={"subDistrict"} value1={address.subDistrict} name2={"district"} value2={address.district} handle={addressHandle} />
                    
                    <InputDouble text1={"จังหวัด"} text2={"รหัสไปรษณีย์"} name1={"province"} value1={address.province} name2={"postalCode"} value2={address.postalCode} handle={addressHandle}/>
                    
                    <InputLong text={"เบอร์ติดต่อ"} behind={"(ระบุเฉพาะตัวเลขเท่านั้น)"} type={"text"} name={"phoneNumber"} value={address.phoneNumber} handle={addressHandle} />
                    
                    <button className="submit-address" onClick={submitForm} >
                        <FontAwesomeIcon icon={['fas', addressSelect >= 0?"edit":"plus"]} size="1x" /> 
                        {(addressSelect >= 0?" แก้ไขที่อยู่จัดส่ง":" เพิ่มที่อยู่จัดส่ง")}
                    </button>
                    <TextWline>
                        เลือกขนส่ง
                    </TextWline>

                    <InputRadio text={"Free Shipping"} state={shipping} handle={setShipingHandle} />
                    <InputRadio  text={"Kerry Express"} state={shipping} handle={setShipingHandle} />  

                    <SpaceBox />
                    <TextWline>
                        วิธีชำระเงิน
                    </TextWline>

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
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 150px 0 50px 0;
    width: 100%;
    button.submit-address{
        margin: 0 auto;
        width: 250px;
        border:none;
        background: #111;
        color: #FFF;
        padding: 15px 0;
        font-size: 1.1rem;
        border-radius: 5px;
        margin-bottom: 65px;
    }
    .select-address{
        font-size: 0.9rem;
        padding: 5px 20px;
        outline: none;
        border-radius: 5px;
        border: 1px solid #999;
        margin-left: 5px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    }
    label{
        white-space: nowrap;
    }
`
const PaymentInputBox = styled.div`
    flex: 1;
    max-width: 850px;
    display: flex;
    flex-direction: column;
    /* @media (max-width: 1600px){
        margin: 0 auto;
    } */
    
`
const CartSummary = styled.div`
    width: clamp(320px, 25vw, 500px);
    margin: 15px 25px;
    position: relative;
    @media (max-width: 896px){
        width: 100%;
        margin: 15px 0px;
    }  
`

const TextWline = styled.h3`
    padding: 20px 0;
    font-size: 1.3rem;
    border-bottom: 2px solid #999;
`

export default Payment