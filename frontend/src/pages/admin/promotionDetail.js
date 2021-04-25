import React, {useState} from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../../graphql/productQuey'
import { useQuery } from '@apollo/client'
import {Header, Table, Input} from '../../styles/styleComponents'
const Orders = () => {
    const [promo, setPromo] = useState({
        type: "",
        method: "",
        description: "",
        createAt: "",
        updateAt: ""
    });
    const { promotionId } = useParams();
    const { loading, error, data } = useQuery(PRODUCT_QUERY)
    const products = data?.products || []
    
    const inputHandle = (event) =>{
        const {name, value} = event.target
            setPromo({
                ...promo,
                [name]: value
            })
    }
    return (
        <Container>         
            <Header>
                <h1>โปรโมชั่น {promotionId}</h1>
                
            </Header>
            <Content>
                <p><b>รหัสโปรโมชั่น :</b> {promotionId}</p>
                <Input>                           
                    <input id="type" type="text" name="type" required value={promo.type} onChange={(e) => inputHandle(e)} />
                    <label htmlFor="type">ประเภทโปรโมชั่น</label>
                </Input>
                <Input>                           
                    <input id="method" type="text" name="method" required value={promo.method} onChange={(e) => inputHandle(e)} />
                    <label htmlFor="method">รูปแบบส่วนลด</label>
                </Input>
                <Input>                           
                    <input id="createAt" type="text" name="createAt" required value={promo.createAt} onChange={(e) => inputHandle(e)} />
                    <label htmlFor="createAt">สร้างเมื่อ</label>
                </Input>
                <Input>                           
                    <input id="updateAt" type="text" name="updateAt" required value={promo.updateAt} onChange={(e) => inputHandle(e)} />
                    <label htmlFor="updateAt">อัปเดทล่าสุดเมื่อ</label>
                </Input>
                <Input>                           
                    <textarea id="description" rows="5" type="text" name="description" required value={promo.description} onChange={(e) => inputHandle(e)} />
                    <label htmlFor="description">คำอธิบายโปรโมชั่น</label>
                </Input>
                <button onClick={() => console.log(promo)}><FontAwesomeIcon icon={['fas', 'save']} /> บันทึก</button>
            </Content>     
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`

const Content = styled.div`
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p{  
        &:first-child{
            align-self: flex-start;
        }
        font-size: 1.2rem;
        b{
            font-weight: bold;
        }
    }
    button{
        border: none;
        color: #FFF;
        background: #2fb12f;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 10px;
        font-size: 1.15rem;
        width:150px;
    }
` 


export default Orders;                    