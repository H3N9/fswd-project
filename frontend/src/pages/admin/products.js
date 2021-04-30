import React, {useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../../graphql/productQuey'
import { DELETE_PRODUCT } from '../../graphql/productMutation'
import { useQuery } from '@apollo/client'
import {Header, Table} from '../../styles/styleComponents'

const Products = () => {
    const { data } = useQuery(PRODUCT_QUERY, {fetchPolicy: 'network-only'})
    const products = data?.products || []

    return (
        <Container>         
            <Header>
                <h1>สินค้าทั้งหมด</h1>
                <Link to={`/admin/product/create`}><FontAwesomeIcon icon={['fas', 'plus']} /> เพิ่มสินค้า</Link>
            </Header>
            <Table>
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อ</th>
                        <th>ประเภท</th>
                        <th>ราคา</th>
                        <th>จำนวนที่มี</th>
                        <th></th>
                    </tr>                       
                </thead>
                {products.map((value, index) => 
                <tr className={index%2 == 0 ? "dim-row" : ""}>
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


export default Products;                    