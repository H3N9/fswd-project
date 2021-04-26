import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../../graphql/productQuey'
import { PRODUCT_PAGINATION_QUERY } from '../../graphql/productPaginationQuery'
import { ORDERS_COUNT_QUERY } from '../../graphql/orderQuery'
import { useQuery } from '@apollo/client'
import {Header, Table} from '../../styles/styleComponents'
const Dashboard = () => {
    const [products, setProducts] = useState([])
    const productQuery = useQuery(PRODUCT_PAGINATION_QUERY, {variables: {pageNum:1, perPageNum: 10}})
    const ordersCountQuery = useQuery(ORDERS_COUNT_QUERY)
    const { completeCount, shippedCount } = ordersCountQuery?.data?.ordersCount || { 
        completeCount: 0,
        shippedCount: 0
    }

    useEffect(() => {
        if (productQuery?.data){
            const newProducts = [...productQuery?.data?.productsWithPagination.items]
            newProducts.sort((item1, item2) => item2.orderQuantityCount - item1.orderQuantityCount)
            setProducts(newProducts)
        }
    }, [productQuery])

    return (
        <Container>
            <Flex> 
                <Link style={{textDecoration: "none"}} to={`/admin/orders`}>
                    <DataBox>
                        <FontAwesomeIcon icon={['fas', 'clipboard-list']} size="3x" />
                        <h3>จำนวนออเดอร์ที่สั่ง</h3> 
                        <h2>{completeCount}</h2>
                    </DataBox>
                </Link>
                <Link style={{textDecoration: "none"}}>
                    <DataBox>
                        <FontAwesomeIcon icon={['fas', 'shipping-fast']} size="3x" />
                        <h3>จำนวนออเดอร์ที่รอจัดส่ง</h3> 
                        <h2>{shippedCount}</h2>
                    </DataBox>
                </Link>
                <Link style={{textDecoration: "none"}} to={`/admin/products`}>
                    <DataBox>
                        <FontAwesomeIcon icon={['fas', 'book']} size="3x" />
                        <h3>จำนวนสินค้าคงเหลือ</h3> 
                        <h2>50</h2>
                    </DataBox>
                </Link>
                <Link style={{textDecoration: "none"}} to={`/admin/promotions`}>
                    <DataBox>
                        <FontAwesomeIcon icon={['fas', 'tag']} size="3x" />
                        <h3>จำนวนคูปองส่วนลดคงเหลือ</h3> 
                        <h2>50</h2>
                    </DataBox>
                </Link>
            </Flex>
            <TableFlex>
                <div>
                    <h1>อันดับสินค้าขายดี</h1>
                    <Table>
                    <thead>                
                        <tr className="table-header">
                            <th>อันดับ</th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคา (บาท)</th>
                            <th>จำนวนการสั่งซื้อ (ชิ้น)</th>
                        </tr>
                    </thead>
                    {products.map((value, index) => 
                    <tr className={index%2 == 0 ? "dim-row" : ""}>
                        <td>{index+1}</td>
                        <td>{value.title}</td>
                        <td>{value.price}</td>
                        <td>{value.orderQuantityCount}</td>
                    </tr>
                    )}
                    </Table>
                </div>
                <div>
                <h1>อันดับคูปองส่วนลด</h1>
                <Table>
                    <thead>                
                        <tr className="table-header">
                            <th>อันดับ</th>
                            <th>ชื่อคูปอง</th>
                            <th>จำนวนการใช้งาน (ครั้ง)</th>
                        </tr>
                    </thead>
                    {products.map((value, index) => 
                    <tr className={index%2 == 0 ? "dim-row" : ""}>
                        <td>{index+1}</td>
                        <td>{value.title}</td>
                        <td>{value.price}</td>
                    </tr>
                    )}
                </Table>                     
                </div>
            </TableFlex>
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`

const Flex = styled.div`
    display: flex;
    overflow-x: scroll;
    justify-content: center;
    margin-bottom: 25px;
    ::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 768px){
        justify-content: flex-start;
        ::-webkit-scrollbar {
            display: initial;
        }
    }
    table{
        width: 100%;
    }

`

const TableFlex = styled.div`
    display: flex;
    div{
        width: 100%;
        padding: 0 20px;
        h1{
            letter-spacing: -1px
        }
    }
    table{
        margin: 10px 0; 
        &:first-child{
            margin-right: 10px;
        }
    }
    @media (max-width: 768px){
        flex-wrap: wrap;
        table{
            &:first-child{
                margin-right: 0px;
            }
    }
    }
`

const DataBox = styled.a`
    background: #FFF;
    width: 170px;
    height: 170px;
    border-radius: 45px;
    padding: 25px;
    margin: 20px;
    flex-shrink: 0;
    color: #444;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    transition: 0.2s;
    h3{
        font-size: 1.25rem;
        width: 75%;
        margin: 10px 0 5px 0;
        color: #777;
    }

    h2{
        font-size: 3rem;
        margin: 5px 0;
        font-weight: bold;
        line-height: 90%;
    }
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    :hover{
        transform: scale(0.95);
    }
`



export default Dashboard;                    