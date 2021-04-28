import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../../graphql/productQuey'
import { COUPON_QUERY_BY_ID } from '../../graphql/promotionQuery'
import { UPDATE_COUPON_BY_ID } from '../../graphql/promotionMutation'
import { useQuery, useMutation } from '@apollo/client'
import {Header, Table, Input, FormContainer} from '../../styles/styleComponents'
import Response from '../../components/response'

const Orders = () => {
    const [ coupon, setCoupon ] = useState({
        type: "",
        method: "",
        description: "",
        discountValue: 0,
        quantity: 0,
        promotionCode: ""
    });
    const [ response, setResponse ] = useState(null)
    const { promotionId } = useParams();
    const { loading, error, data } = useQuery(COUPON_QUERY_BY_ID, {variables: {id: promotionId}})
    const [ updateCoupon ] = useMutation(UPDATE_COUPON_BY_ID)

    useEffect(() => {
        if (data?.couponPromotionById){
            setCoupon(data?.couponPromotionById)
        }
    }, [data])
    
    const inputHandle = (event) =>{
        const {name, value} = event.target
            setCoupon({
                ...coupon,
                [name]: value
            })
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        const inputCoupon = {
            method: coupon.method,
            description: coupon.description,
            discountValue: Number(coupon.discountValue),
            quantity: Number(coupon.quantity),
            promotionCode: coupon.promotionCode
        }

        try {
            const newCoupon = await updateCoupon({variables: {id: promotionId, object: inputCoupon}})
            setCoupon(newCoupon?.data?.updateCouponById?.record)
            setResponse("Success")

        } catch (error) {
            console.log(error.message)
            setResponse("Fail")
        }
    }

    return (
        <Container>         
            <Header>
                <h1>แก้ไขคูปอง</h1>
                
            </Header>
            <FormContainer onSubmit={submitHandle}>
                <p><b>รหัสโปรโมชั่น :</b> {promotionId}</p>
                <Input>                           
                    <select type="text" id="method" name="method" value={coupon.method} required onChange={inputHandle}>
                        <option value="DISCOUNT">Discount</option>
                        <option value="PERCENT">Percent</option>
                    </select>
                    <label htmlFor="method">ประเภท</label>
                </Input>
                <Input>                           
                    <input id="discountValue" type="number" name="discountValue" required value={coupon.discountValue} onChange={inputHandle} />
                    <label htmlFor="discountValue">value</label>
                </Input>
                <Input>                           
                    <input id="promotionCode" type="text" name="promotionCode" required value={coupon.promotionCode} onChange={inputHandle}/>
                    <label htmlFor="promotionCode">Code</label>
                </Input>
                <Input>                      
                    <input id="quantity" type="number" name="quantity" required value={coupon.quantity} onChange={inputHandle}/>
                    <label htmlFor="quantity">จำนวน</label>
                </Input>
                <Input>       
                    <textarea id="" cols="20" rows="5" name="description" value={coupon.description} onChange={inputHandle}></textarea>
                    <label htmlFor="">คำอธิบาย</label>
                </Input>
                <button><FontAwesomeIcon icon={['fas', 'save']} /> บันทึก</button>
            </FormContainer>
            <Response state={response} setState={setResponse} />     
        </Container>
    )
}

const FormBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    padding: 100px 5%;
`

const Content = styled.div`
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p{  
        &:first-child{
            align-self: flex-start;
        }
        font-size: 1.2rem;
        b{
            font-weight: bold;
        }
    }
    button{
        border: none;
        color: #FFF;
        background: #2fb12f;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 10px;
        font-size: 1.15rem;
        width:150px;
    }
` 


export default Orders;                    