import React, {useState} from 'react'
import styled from 'styled-components'
import { useLocation, useParams } from 'react-router-dom'
import { MYORDER_QUERY_BY_ID } from '../graphql/myOrderQuery'
import { useQuery } from '@apollo/client'
import {Header} from '../styles/styleComponents'
import OrderItem from '../components/order/orderItem'

const MyOrderDetail = () => {
    const { orderId } = useParams()
    const { data } = useQuery(MYORDER_QUERY_BY_ID, {variables: {id: orderId}})
    const order = data?.myOrderById
    const status = (order?.status === 'COMPLETE')?'ยืนยันแล้ว':(order?.status === 'SHIPPED')?'จัดส่งแล้ว':'สิ้นสุด'
    const orderProduct = order?.orderProducts || []
    const address = data?.myOrderById?.shipping
    console.log(order)

    return (
        <Container>
            <Header>
                <h1>รหัสออเดอร์: {orderId}</h1>
            </Header>
            <Flex>
                <OrderDetail>
                    <p><b>สถานะออเดอร์ : {status}</b></p>
                    <p><b>ที่อยู่สำหรับการจัดส่ง :</b></p>
                    <Address>
                        <p>{address?.address}</p>
                        <p><b>ตำบล/แขวง :</b> {address?.subDistrict || '-'}</p>
                        <p><b>อำเภอ/เขต : </b>{address?.district || '-'}</p>
                        <p><b>จังหวัด : </b>{address?.province}</p>
                        <p><b>รหัสไปรษณีย์ : </b>{address?.postalCode}</p>
                        <p><b>เบอร์โทรศัพท์ : </b>{address?.phoneNumber}</p>
                    </Address>
                </OrderDetail>
                <OrderCard>
                    <div className="order-content order-header">
                        <h2>รายการสินค้า</h2>
                    </div>
                    <div className="order-content order-product">
                    </div>
                    {orderProduct.map((item) => <OrderItem key={item._id} orderProduct={item} />)}
                    <div className="order-content order-price">
                        <p>ราคารวมสินค้า :  <b>฿{order?.totalPrice}</b></p>
                        <p>ส่วนลด :  <b>-฿{order?.totalPrice - order?.netTotalPrice}</b></p>
                        <h2>ราคาสุทธิ :  <b>฿{order?.netTotalPrice}</b></h2>
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

const Address = styled.div`
    border-radius: 5px;
    width: 60%;
    min-height: 150px;
    padding: 5px 7px;
    margin-bottom: 25px;
    margin-left: 20px;
    p{
        margin: 5px 0;
    }
    @media (max-width: 1200px){
        max-width: 1200px;
        width: 98%;
    }

`

export default MyOrderDetail;                    