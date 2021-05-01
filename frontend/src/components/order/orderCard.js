import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import OrderItem from './orderItem'

const OrderCard = ({ order }) => {
    const status = (order.status === 'COMPLETE')?'ยืนยันแล้ว'
    :(order.status === 'SHIPPED')?'จัดส่งแล้ว':'สิ้นสุด'
    const { orderProducts } = order

    return (
        <Card>
            <div className="order-content order-header">
                <p><b>รหัสออเดอร์ :</b> {order._id}</p>
                <p><b>เวลา :</b> {order.updatedAtWithFormatDateTime}</p>
                <Status>
                    <p>{status}</p>
                </Status>
            </div>
            <div className="order-content order-product">
                {orderProducts.map((item) => <OrderItem key={item._id} orderProduct={item} />)}
            </div>
            <div className="order-content order-price">
                <p>ราคาสุทธิ :  <b>฿{order.netTotalPrice}</b></p>
            </div>
            <div className="order-content order-footer">
                <div className="order-menu">
                    <Link to={`/customer/order/${order._id}`}>
                        <button>
                            ดูข้อมูลออเดอร์
                        </button>
                    </Link>
                </div>

            </div>
        </Card>
    )
}

const Card = styled.div`
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

const Status = styled.div`
    background: #32a528;
    padding: 2px 7.5px;
    border-radius: 50px;
    color: #FFF;
`

export default OrderCard