import React, {useState} from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { PRODUCT_PAGINATION_QUERY } from '../graphql/productPaginationQuery'
import { useQuery } from '@apollo/client'

const MyOrder = () => {
    return (
        <Container>      
            <Flex>
            <OrderCard>
                    <div className="order-content order-header">
                        <p>รหัสออเดอร์ :</p>
                        <Status>
                            <p>สำเร็จ</p>
                        </Status>
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
                        <p>ราคาทั้งหมด :  <b>฿50</b></p>
                    </div>
                    <div className="order-content order-footer">
                        <div className="order-menu">
                            <button>
                                ดูข้อมูลออเดอร์
                            </button>
                        </div>

                    </div>
                </OrderCard>
                <OrderCard>
                    <div className="order-content order-header">
                        <p>รหัสออเดอร์ :</p>
                        <Status>
                            <p>สำเร็จ</p>
                        </Status>
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
                    </div>
                    <div className="order-content order-price">
                        <p>ราคาทั้งหมด :  <b>฿50</b></p>
                    </div>
                    <div className="order-content order-footer">
                        <div className="order-menu">
                            <button>
                                ดูข้อมูลออเดอร์
                            </button>
                        </div>

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
    justify-content: center;
    margin-bottom: 50px;

`

const SearchBar = styled.div`
    width: 100%;
    position: sticky;
    top: 7%;
    z-index: 10;
    padding: 5px 0;
    display: flex;
    align-items: center;
    background: #f6f6f6;
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    div{
        width: fit-content;
        padding: 0 10px;
        input{
            background: transparent;
            width: 20vw;
            @media (max-width: 510px){
                width: 100px;
            }
        }
        select{
            background: transparent;
            @media (max-width: 510px){
                width: 100px;
            }
        }

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
        p{
            margin: 0;
        }
    }
    .order-product{
        flex-direction: column;
    }

    .order-price{
        justify-content: flex-end;
        border-top: 1px solid #d1d1d1;
        border-bottom: 1px solid #d1d1d1;
        margin-bottom: 10px;
        p{
            font-size: clamp(1.1rem,3vmin,1.5rem);
            margin: 5px 0;
        }
    }
    .order-footer{
        justify-content: space-between;
        button{
            background-image: linear-gradient(120deg, #5128e6 , #2891e6);
            color: #FFF;
            border: none;
            font-size: 1rem;
            border-radius: 5px;
            padding: 5px 10px;
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

const Status = styled.div`
    background: #32a528;
    padding: 2px 7.5px;
    border-radius: 50px;
    color: #FFF;
`
export default MyOrder;                    