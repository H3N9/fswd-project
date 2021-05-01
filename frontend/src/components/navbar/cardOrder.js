import React from 'react'
import styled from 'styled-components'
import {main} from '../../path'



const CardOrder = ({product}) => {
    const {image = "", title = "", } = product?.product
    const imageIcon = (image)?`${main}/image/${image}`:'http://ird.rmuti.ac.th/2020/world/upload/post/picture/thumb/IRD291220C00001/noimg.png'
    return (
        <Pack key={product._id}>
            <AmountBox>
                {product?.quantity}
            </AmountBox>
            <ImageOrder src={imageIcon} />
            <TitleOrder>
                {title}
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