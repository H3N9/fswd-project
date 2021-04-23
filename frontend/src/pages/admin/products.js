import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../../graphql/productQuey'
import { useQuery } from '@apollo/client'
const Products = () => {
    const { loading, error, data } = useQuery(PRODUCT_QUERY)
    const products = data?.products || []
    console.log(products.map((value) => value._id))
    return (
        <Container>         
            <Header>
                <h1>สินค้าทั้งหมด</h1>
                <Link to={`/createProduct`}><FontAwesomeIcon icon={['fas', 'plus']} /> เพิ่มสินค้า</Link>
            </Header>
            <Table>
                <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อ</th>
                    <th>ประเภท</th>
                    <th>ราคา</th>
                    <th>จำนวนที่มี</th>
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
                        <button>Edit</button>
                        <button>Delete</button>
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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 50px;
    h1{
        margin: 0;
        font-size: clamp(2rem, 5vmin, 2.5rem);
    }
    a{
        text-decoration:none;
        color: #FFF;
        background: #2fb12f;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 10px;
    }
`
const Table = styled.table`
    width:100%;
    overflow: scroll;
    tr{
        td{
            padding: 10px 0;
            text-align: center;
        }
    }
`

export default Products;                    