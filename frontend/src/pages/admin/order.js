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
    width: 100%;
    p{
        font-size: 1.2rem;
        b{
            font-weight: bold;
        }
    }
` 


export default Orders;                    