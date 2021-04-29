import React from 'react'
import styled from 'styled-components'

const OrderItem = ({ orderProduct }) => {
    const { product } = orderProduct

    return (
        <Item>
            <div className="image">
                <img src="" alt=""/>
            </div>
            <div className="detail">
                <p className="product-name">{product.title}</p>
                <p className="total">x{orderProduct.quantity}</p>
                <p className="price">฿{product.price}</p>
            </div>
        </Item>
)
}

const Item = styled.div`
    width: 100%;
    height: 140px;
    margin: 25px 0;
    display:flex;
    .image{
        width: 15%;
        min-width: 110px;
        background: #EFEFEF;
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