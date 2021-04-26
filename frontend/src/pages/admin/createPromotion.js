import React from 'react'
import styled from 'styled-components'
import {Box9p, SpaceBox} from '../../styles/styleComponents'
import CouponForm from '../../components/adminPromotion/couponForm'


const CreatePromotion = () => {



    return (
        <Box9p>
            <SpaceBox />
            <SpaceBox />
            <FormBox>
                <CouponForm />
            </FormBox>



        </Box9p>
    )



}

const FormBox = styled.div`
    width: 100%;
    height: 500px;
    background-color: red;
`


export default CreatePromotion