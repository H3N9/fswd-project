import React, {useState} from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../../graphql/productQuey'
import { useQuery } from '@apollo/client'
import {Header, Table} from '../../styles/styleComponents'
const Orders = () => {
    const { orderId } = useParams();
    const { loading, error, data } = useQuery(PRODUCT_QUERY)
    const products = data?.products || []
    console.log(products.map((value) => value._id))
    return (
        <Container>         
            <Header>
                <h1>ออเดอร์ {orderId}</h1>
                <button><FontAwesomeIcon icon={['fas', 'check']} /> ยืนยัน</button>
            </Header>
            <Flex>
                <Content>
                    <p><b>รหัสออเดอร์ :</b> {orderId}</p>
                    <p><b>ออเดอร์เป็นของผู้ใช้ :</b> </p>
                    <p><b>สถานะออเดอร์ :</b> </p>
                    <p><b>สร้างเมื่อ :</b> </p>
                    <p><b>อัปเดทล่าสุดเมื่อ :</b> </p>
                    <p><b>ส่วนลด :</b> </p>
                    <p className="address-header"><b>ที่อยู่สำหรับจัดส่ง</b> </p>
                    <Address>
                        <p>Cecilia Chapman
                        711-2880 Nulla St.
                        Mankato Mississippi 96522
                        (257) 563-7401</p>
                    </Address>
                </Content>
                <Table>
                    <thead>                
                        <tr className="table-header">
                            <th>ชื่อสินค้า</th>
                            <th>ราคา</th>
                            <th>จำนวนที่สั่งซื้อ</th>
                        </tr>
                    </thead>
                    {products.map((value, index) => 
                    <tr className={index%2 == 0 ? "dim-row" : ""}>
                        <td>{value.title}</td>
                        <td>{value.price}</td>
                        <td>{value.quantity} x</td>
                    </tr>
                    )}
                </Table>    
            </Flex>
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`

const Flex = styled.div`
    display: flex;
    table{
        width: 100%;
    }
    @media (max-width: 1200px){
        flex-direction: column;
    }

`

const Content = styled.div`
    max-width: 750px;
    padding-right: 10px;
    width: 100%;
    p{
        font-size: 1.2rem;
        b{
            font-weight: bold;
        }
        &.address-header{
            margin: 50px 0 5px 0;
        }
    }
` 
const Address = styled.div`
    background: #e2e2e2;
    border-radius: 5px;
    width: 60%;
    min-height: 150px;
    padding: 5px 7px;
    margin-bottom: 25px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    p{
        margin: 0;
        color: #222;
    }
    @media (max-width: 1200px){
        max-width: 1200px;
        width: 98%;
    }

`

export default Orders;                    