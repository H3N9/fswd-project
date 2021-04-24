import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../../graphql/productQuey'
import { useQuery } from '@apollo/client'
import {Header, Table} from '../../styles/styleComponents'
const Orders = () => {
    const { loading, error, data } = useQuery(PRODUCT_QUERY)
    const products = data?.products || []
    console.log(products.map((value) => value._id))
    return (
        <Container>         
            <Header>
                <h1>จัดการออเดอร์</h1>
            </Header>
            <Table>
                <tr className="table-header">
                    <th>ลำดับ</th>
                    <th>ผู้ใช้</th>
                    <th>ราคาทั้งหมด</th>
                    <th>สถานะออเดอร์</th>
                    <th>สร้างเมื่อ</th>
                    <th></th>
                </tr>
                {products.map((value, index) => 
                <tr>
                    <td>{index+1}</td>
                    <td>{value.title}</td>
                    <td>{value.types}</td>
                    <td>{value.price}</td>
                    <td>{value.quantity}</td>
                    <td>
                        <Link to={`/admin/product/${value._id}`} ><button className="edit-button"><FontAwesomeIcon icon={['fas', 'edit']} /> แก้ไข</button></Link>
                        <button className="delete-button"><FontAwesomeIcon icon={['fas', 'trash']} /> ลบ</button>
                    </td>
                </tr>
                )}
            </Table>      
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`



export default Orders;                    