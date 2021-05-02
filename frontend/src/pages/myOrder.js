import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { MYORDER_QUERY } from '../graphql/myOrderQuery'
import OrderCard from '../components/order/orderCard'
import {Header, None} from '../styles/styleComponents'

const MyOrder = () => {
    const { data } = useQuery(MYORDER_QUERY, {variables: {
        object: {_operators: {status: {in: ["COMPLETE", "SHIPPED", "CLOSED"]}}},
        sort: "UPDATEDAT_DESC",
    }, fetchPolicy: 'network-only'})
    const orders = data?.myOrders || []

    return (
        <Container>
            <Header><h1>ประวัติการสั่งซื้อ</h1></Header>   
            {orders.length === 0 ? <None><h1>ไม่มีประวัติการสั่งซื้อ</h1></None> : null}   
            <Flex>
                {orders.map((item) => (<OrderCard key={item._id} order={item} />))}
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