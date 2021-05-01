import React from 'react'
import styled from 'styled-components'
import {main} from '../../path'

const OrderItem = ({ orderProduct }) => {
    const { product = {} } = orderProduct
    const {title = "", quantity = 0, price = 0, image = ""} = product
    const imageIcon = (image)?`${main}/image/${image}`:'http://ird.rmuti.ac.th/2020/world/upload/post/picture/thumb/IRD291220C00001/noimg.png'
    

    return (
        <Item>
            <div className="image">
                <img src={imageIcon} alt=""/>
            </div>
            <div className="detail">
                <p className="product-name">{title}</p>
                <p className="total">x{quantity}</p>
                <p className="price">฿{price}</p>
            </div>
        </Item>
)
}

const Item = styled.div`
    width: 100%;

    margin: 25px 0;
    display:flex;
    .image{
        width: 15%;
        min-width: 110px;
        overflow: hidden;
        background: #EFEFEF;
        img{
            width: 100%;
            height: 175px;
            object-fit: contain;
        }
    }
    .detail{
        flex: 1;
        text-align: right;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p{
            margin: 0;
            &.product-name{
                font-size: clamp(1.1rem,2vmin,1.8rem);
                font-weight: bold;
            }
            &.total{
                font-size: clamp(1.025rem,2vmin,1.2rem);
                color: #666;
            }
            &.price{
                font-size: clamp(1.05rem,2vmin,1.3rem);
            }
        }
    }
`

export default OrderItem