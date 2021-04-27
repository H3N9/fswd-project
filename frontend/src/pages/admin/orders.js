import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ORDERS_PAGINATION_QUERY } from '../../graphql/orderQuery'
import { useQuery } from '@apollo/client'
import {Header, Table} from '../../styles/styleComponents'

const Orders = () => {
    const { loading, error, data } = useQuery(ORDERS_PAGINATION_QUERY, {variables: {
        page: null,
        perPage: null,
        object: {_operators: {status: {in: ["COMPLETE", "SHIPPED", "CLOSED"]}}},
        sort: "STATUS_ASC"
    }})
    const orders = data?.ordersWithPagination?.items || []
    return (
        <Container>         
            <Header>
                <h1>จัดการออเดอร์</h1>
            </Header>
            <Table>
                <thead>
                    <tr className="table-header">
                        <th>ลำดับ</th>
                        <th>ผู้ใช้</th>
                        <th>ราคาทั้งหมด</th>
                        <th>สถานะออเดอร์</th>
                        <th>อัพเดทล่าสุด</th>
                        <th></th>
                    </tr>                              
                </thead>
                {orders.map((value, index) => 
                <tr className={index%2 == 0 ? "dim-row" : ""}>
                    <td>{index+1}</td>
                    <td>{value.user.name}</td>
                    <td>{value.netTotalPrice}</td>
                    <td>{value.status}</td>
                    <td>{value.updatedAtWithFormatDateTime}</td>
                    <td>
                        <Link to={`/admin/order/${value._id}`} ><button className="edit-button"><FontAwesomeIcon icon={['fas', 'edit']} /> แก้ไข</button></Link>
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