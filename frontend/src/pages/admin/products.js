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
                <Link to={`/admin/product/create`}><FontAwesomeIcon icon={['fas', 'plus']} /> เพิ่มสินค้า</Link>
            </Header>
            <Table>
                <tr className="table-header">
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
    border-collapse:collapse;  
    tr{
        &.table-header{
            background: rgba(0,0,0,0.75);
            color: #FFF;
            margin: 0;
            border: none;
            th{
                padding: 15px 10px;
            }
        }
        td{
            padding: 10px 0;
            text-align: center;
            button{
                margin: 3px;
                padding: 10px 15px;
                border: none;
                &.edit-button{
                    background: #ffd000;   
                }
                &.delete-button{
                    background: #e02323;   
                    color: #FFF;
                }
            }
        }
    }
`

export default Products;                    