import React from 'react'
import styled from 'styled-components'



const CardOrder = ({product}) => {
    return (
        <Pack key={product._id}>
            <AmountBox>
                {product?.quantity}
            </AmountBox>
            <ImageOrder src={product?.book?.image} />
            <TitleOrder>
                {product?.book?.title}
            </TitleOrder>
        </Pack>
    )
}

const Pack = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`
const AmountBox = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ImageOrder = styled.img`
    padding: 2.5%;
    width: 20%;
    height: 80px;
    object-fit: cover;
`

const TitleOrder = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`


export default CardOrder