import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { from, useQuery } from '@apollo/client'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Input} from '../styles/styleComponents'
const MyInfo = () => {
    // const { loading, error, data } = useQuery(ORDERS_PAGINATION_QUERY, {variables: {
    //     page: null,
    //     perPage: null,
    //     object: {_operators: {status: {in: ["COMPLETE", "SHIPPED", "CLOSED"]}}},
    //     sort: "STATUS_ASC"
    // }})
    // const orders = data?.ordersWithPagination?.items || []
    const [ data, setData ] = useState({username: "", name: ""})
    return (
        <Container>
            <UserDetail>
                <div className="user-image">
                    <FontAwesomeIcon icon={['fas', 'user']} />
                </div>
                <div className="user-text">
                    {/* <h1>{user?.name}</h1>
                    <h3>{isAdmin ? "ผู้ดูแลระบบ" : "ผู้ใช้งานทั่วไป"}</h3> */}
                    <h1>Username</h1>
                    <h3>Role</h3>
                </div>
            </UserDetail>
            <FormContainer>
                <Input>                     
                    <input type="text" id="username" value={data.username} required onChange={(e) => setData({username: e.target.value, name: data.name})}/>
                    <label htmlFor="username">ชื่อผู้ใช้</label>
                </Input>
                <Input>                     
                    <input type="text" id="username" required value={data.name} onChange={(e) => setData({username: data.username, name: e.target.value})}/>
                    <label htmlFor="username">ชื่อ นามสกุล</label>
                </Input>
                <button onClick={() => console.log(data)}> <FontAwesomeIcon icon={['fas', 'save']} size="1x" /> บันทึก</button>
            </FormContainer>

        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`
const UserDetail = styled.div`
    padding: 10px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .user-image{
        width: clamp(75px,7.5vw,95px);
        height:  clamp(75px,7.5vw,95px);
        background-image: linear-gradient(120deg, #5128e6 , #2891e6);
        border-radius: 50%;
        display: flex;
        color: rgba(255,255,255, 0.9);
        font-weight: bold;
        justify-content: center;
        align-items: center;
        font-size: 50px;
        margin-right: 10px;
        margin-bottom: 20px;
    }
    .user-text{
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        h1{
            margin: 0;
            font-weight: 500;
            line-height: 1;
            font-size: 2rem;
        }
        h3{
            margin: 0;
            font-size: 1.4rem;
            color: #444;
        }
    }
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        max-width: 500px;
    }
    button{
        border: none;
        font-size: 1.2rem;
        background: #28a745;
        color: #FFF;
        padding: 10px 20px;
        border-radius: 5px;
    }
`
export default MyInfo;
