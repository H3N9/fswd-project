import React, { useState } from 'react'
import styled from 'styled-components'
import {Box9p, SpaceBox} from '../../styles/styleComponents'
import CouponForm from '../../components/adminPromotion/couponForm'
import { useMutation } from '@apollo/client'
import { CREATECOUPON_MUTATION } from '../../graphql/createCoupon'
import Response from '../../components/response'


const CreatePromotion = () => {
    const [coupon, setCoupon] = useState({
        method: "DISCOUNT",
        discountValue: 0,
        description: "",
        promotionCode: "",
        quantity: 0,
    })
    const [createCoupon] = useMutation(CREATECOUPON_MUTATION)
    const [response, setResponse] = useState(null)

    const submitHandle = async (e) => {
        e.preventDefault()
        const reStruct = {
            ...coupon,
            discountValue: Number(coupon.discountValue),
            quantity: Number(coupon.quantity)
        }
        
        try{
            await createCoupon({variables:{record:reStruct}})
            console.log("T")
            setResponse("Success")
        }
        catch (e){
            console.log("sT")
            console.log(e.message)
            setResponse("Fail")
        }
    }



    return (
        <Box9p>
            <SpaceBox />
            <FormBox>
                <CouponForm coupon={coupon} setCoupon={setCoupon} submitHandle={submitHandle} />
            </FormBox>
            <Response state={response} setState={setResponse} />
            <SpaceBox />


        </Box9p>
    )



}

const FormBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`


export default CreatePromotion