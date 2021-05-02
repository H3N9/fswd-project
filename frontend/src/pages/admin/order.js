import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ORDER_QUERY_BY_ID } from '../../graphql/orderQuery'
import { ORDER_UPDATE_STATUS } from '../../graphql/orderMutation'
import { useQuery, useMutation } from '@apollo/client'
import {Header, Table} from '../../styles/styleComponents'
import ConfirmModal from '../../components/adminOrder/confirmModal'
import Response from '../../components/response'
import { main } from '../../path'

const Orders = () => {
    const { orderId } = useParams();
    //const { loading, error, data } = useQuery(PRODUCT_QUERY)
    const { data } = useQuery(ORDER_QUERY_BY_ID, {variables: {id: orderId}})
    const orderProducts = data?.order?.orderProducts || []
    const address = data?.order?.shipping
    const discounts = data?.order?.discounts || []
    const imagePayment = data?.order?.imagePayment || ''
    const [order, setOrder] = useState()
    const [status, setStatus] = useState("");
    const [isModal, setIsModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(undefined)
    const [updateOrderStatus] = useMutation(ORDER_UPDATE_STATUS)

    useEffect(() => {
        if (data?.order){
            setOrder(data?.order)
            setStatus(data?.order.status)
        }
    }, data)

    const updateStatusHandle = useCallback(() => {
        updateOrderStatus({variables: {id: orderId, object: { status }}})
        .then((response) => {
            setOrder(response.data.updateOrder.record)
            setIsUpdate('Success')
        })
        .catch((error) => {
            setIsUpdate('Fail')
        })
        setIsModal(false)
    })

    return (
        <>
        <Response state={isUpdate} setState={setIsUpdate} />
        <ConfirmModal status={status} setStatus={setStatus} setIsModal={setIsModal} isModal={isModal} updateHanle={updateStatusHandle}/>
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
                    <Total>
                        <h2>ราคาสุทธิ : {order?.netTotalPrice} บาท</h2>    
                    </Total>

                    <p className="address-header"><b>ที่อยู่สำหรับจัดส่ง</b> </p>
                  
                    <Address>
                        <p>{address?.address}</p>
                        <p><b>ตำบล/แขวง :</b> {address?.subDistrict || '-'}</p>
                        <p><b>อำเภอ/เขต : </b>{address?.district || '-'}</p>
                        <p><b>จังหวัด : </b>{address?.province}</p>
                        <p><b>รหัสไปรษณีย์ : </b>{address?.postalCode}</p>
                        <p><b>เบอร์โทรศัพท์ : </b>{address?.phoneNumber}</p>
                    </Address>
                    <p className="address-header"><b>หลักฐานการชำระเงิน</b> </p>
                    <ImageBox>
                        <MainImageBox>
                            <MainImage src={(imagePayment === "" || imagePayment === null) ? "http://ird.rmuti.ac.th/2020/world/upload/post/picture/thumb/IRD291220C00001/noimg.png" : `${main}/image/${imagePayment}`} />
                        </MainImageBox>
                    </ImageBox>
                </Content>
                <TableContainer>
                    <h1>รายการสินค้า</h1>
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
                    </Table>
                    {
                        discounts.length === 0 ? null :
                        <>
                            <h1>รายการโปรโมชั่น</h1>
                            <Table>
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
                            </Table>
                        </>
                    }
                    
                </TableContainer>
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
        margin-bottom: 20px;
    }
    @media (max-width: 1200px){
        flex-direction: column;
    }
`

const TableContainer = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
`
const Total = styled.div`
    padding: 10px 0;
    width: 90%;
    margin-bottom: 20px;
    h2{
        font-weight: bold;
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
            font-size: 1.7rem;
            margin: 50px 0 5px 0;
        }
    }
` 
const Address = styled.div`
    border-radius: 5px;
    width: 60%;
    min-height: 150px;
    padding: 5px 7px;
    margin-bottom: 25px;
    margin-left: 10px;
    p{
        margin: 5px 0;
    }
    @media (max-width: 1200px){
        max-width: 1200px;
        width: 98%;
    }

`

const ImageBox = styled.div`
    width: clamp(500px, 40%, 1000px);
    display: flex;
    flex-direction: column;
`

const MainImageBox = styled.div`
    width: 100%;
    padding: 10px 0;
    text-align: center;
    
`

const MainImage = styled.img`
    width: 55%;
    object-fit: cover;
    
`

export default Orders;                    