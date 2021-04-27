import React, {useState} from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { PRODUCT_PAGINATION_QUERY } from '../graphql/productPaginationQuery'
import { useQuery } from '@apollo/client'
import {Header} from '../styles/styleComponents'
const MyOrderDetail = () => {
    return (
        <Container>
            <Header>
                <h1>ดูข้อมูลออเดอร์</h1>
            </Header>
            <Flex>
                <OrderDetail>
                    <p><b>หมายเลขออเดอร์ :</b></p>
                    <p><b>สถานะออเดอร์ :</b></p>
                    <p><b>ส่วนลด :</b></p>
                    <p><b>ที่อยู่สำหรับการจัดส่ง :</b></p>
                </OrderDetail>
                <OrderCard>
                    <div className="order-content order-header">
                        <h2>รายการสินค้า</h2>
                    </div>
                    <div className="order-content order-product">
                        <OrderItem>
                            <div className="image">
                                <img src="" alt=""/>
                            </div>
                            <div className="detail">
                                <p className="product-name">Product Name</p>
                                <p className="total">x1</p>
                                <p className="price">฿50</p>
                            </div>
                        </OrderItem>
                        <OrderItem>
                            <div className="image">
                                <img src="" alt=""/>
                            </div>
                            <div className="detail">
                                <p className="product-name">Product Name</p>
                                <p className="total">x1</p>
                                <p className="price">฿50</p>
                            </div>
                        </OrderItem>
                    </div>
                    <div className="order-content order-price">
                        <p>ราคารวมสินค้า :  <b>฿50</b></p>
                        <p>ส่วนลด :  <b>-฿50</b></p>
                        <h2>ราคาทั้งหมด :  <b>฿0</b></h2>
                    </div>
                </OrderCard>              
            </Flex>
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 4%;
`

const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 50px;
`
const OrderDetail = styled.div`
    width: max-content;
    margin-bottom: 20px;
    p{
        font-size: 1.2rem;
       
    }
    
`
const OrderCard = styled.div`
    width:900px;
    padding: 10px 20px;
    margin-bottom: 30px;
    background: #FFF;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .order-content {
        display: flex;
    }
    .order-header{
        justify-content: space-between;
        padding-bottom: 5px;
        border-bottom: 1px solid #d1d1d1;
        h2{
            margin: 0;
        }
    }
    .order-product{
        flex-direction: column;
    }

    .order-price{
        flex-direction: column;
        align-items: flex-end;
        border-top: 1px solid #d1d1d1;
        margin-bottom: 10px;
        p, h2{
            margin: 5px 0;
        }
        p{
            font-size: clamp(1.1rem,3vmin,1.15rem);
        }
        h2{
            font-size: clamp(1.5rem,3vmin,1.6rem);   
        }
    }

`

const OrderItem = styled.div`
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

export default MyOrderDetail;                    