import React, {useState} from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../../graphql/productQuey'
import { ORDER_QUERY_BY_ID } from '../../graphql/orderQuery'
import { useQuery } from '@apollo/client'
import {Header, Table} from '../../styles/styleComponents'
import ConfirmModal from '../../components/adminOrder/confirmModal'
const Orders = () => {
    const { orderId } = useParams();
    //const { loading, error, data } = useQuery(PRODUCT_QUERY)
    const { data } = useQuery(ORDER_QUERY_BY_ID, {variables: {id: orderId}})
    const order = data?.order
    const orderProducts = data?.order?.orderProducts || []
    const address = data?.order?.shipping
    const discounts = data?.order?.discounts || []
    const [status, setStatus] = useState("");
    const [isModal, setIsModal] = useState(false)

    return (
        <>
        <ConfirmModal status={status} setStatus={setStatus} setIsModal={setIsModal} isModal={isModal}/>
        <Container>         
            <Header>
                <h1>ออเดอร์ {orderId}</h1>
                <button onClick={() => setIsModal(true)}><FontAwesomeIcon icon={['fas', 'check']} /> ยืนยัน</button>
            </Header>
            <Flex>
                <Content>
                    <p><b>รหัสออเดอร์ :</b> {orderId}</p>
                    <p><b>ออเดอร์เป็นของผู้ใช้ :</b> {order?.user.name}</p>
                    <p><b>สถานะออเดอร์ :</b> {order?.status}</p>
                    <p><b>สร้างเมื่อ :</b> {order?.createdAtWithFormatDateTime}</p>
                    <p><b>อัปเดทล่าสุดเมื่อ :</b> {order?.updatedAtWithFormatDateTime}</p>
                    <p className="address-header"><b>ที่อยู่สำหรับจัดส่ง</b> </p>
                    <Address>
                        <p>{address?.address}</p>
                        <p><b>ตำบล/แขวง:</b> {address?.subDistrict || '-'}</p>
                        <p><b>อำเภอ/เขต: </b>{address?.district || '-'}</p>
                        <p><b>จังหวัด: </b>{address?.province}</p>
                        <p><b>รหัสไปรษณีย์: </b>{address?.postalCode}</p>
                        <p><b>เบอร์โทรศัพท์: </b>{address?.phoneNumber}</p>
                    </Address>
                </Content>
                <Table>
                    <thead>                
                        <tr className="table-header">
                            <th>ชื่อสินค้า</th>
                            <th>ราคา (บาท)</th>
                            <th>จำนวนที่สั่งซื้อ (ชิ้น)</th>
                        </tr>
                    </thead>
                    {orderProducts.map((value, index) => 
                    <tr className={index%2 == 0 ? "dim-row" : ""}>
                        <td>{value.product.title}</td>
                        <td>{value.product.price}</td>
                        <td>{value.quantity}</td>
                    </tr>
                    )}
                    <h2>โปรโมชั่น</h2>
                    <thead>                
                        <tr className="table-header">
                            <th>ประเภท</th>
                            <th>รายละเอียดโปรโมชั่น</th>
                            <th>ส่วนลด (บาท)</th>
                        </tr>
                    </thead>
                    {discounts.map((value, index) => 
                    <tr className={index%2 == 0 ? "dim-row" : ""}>
                        <td>{value.type}</td>
                        <td>{value.description}</td>
                        <td>{value.discount}</td>
                    </tr>
                    )}
                    <Header>
                        <h2>ราคาสุทธิ: {order?.netTotalPrice} บาท</h2>
                    </Header>
                </Table>
            </Flex>
        </Container>
        </>
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