import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Input} from '../styles/styleComponents'
import { MY_PROFILE } from '../graphql/meQuery'
import { UPDATE_PROFILE } from '../graphql/meMutation'
import Response from '../components/response'

const MyInfo = () => {
    const myProfile = useQuery(MY_PROFILE, {fetchPolicy: 'network-only'})
    const [ updateProfile ] = useMutation(UPDATE_PROFILE)
    const [ data, setData ] = useState({username: "", name: "", oldPass: "", newPass: "", confirmPass: ""})
    const [ error, setError ] = useState(<></>)
    const [ response, setResponse ] = useState(null)

    useEffect(() => {
        if (myProfile?.data?.me){
            const newProfile = {
                ...data,
                username: myProfile?.data?.me.username,
                name: myProfile?.data?.me.name,
            }
            setData(newProfile)
        }
    }, [myProfile])

    const inputHandle = (event) =>{
        const {name, value} = event.target
        setData({
            ...data,
            [name]: value
        })
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        const newInput = {
            username: data.username,
            name: data.name,
            oldPassword: "",
            newPassword: ""
        }
        setError(<></>)
        if (data.newPass !== "" && data.oldPass !== ""){
            if (data.newPass === data.confirmPass){
                newInput.oldPassword = data.oldPass
                newInput.newPassword = data.newPass
            }
            else{
                setError(
                    <ErrorContainer>
                        <p>รหัสผ่านใหม่กับ ยืนยันรหัสผ่านไม่ตรงกัน</p>
                    </ErrorContainer>
                )
                return 0;
            }
        }
        try{
            const newProfile = await updateProfile({ variables: {object: newInput} })
            setData({
                ...newProfile.data.updateProfile,
                oldPass: "", 
                newPass: "", 
                confirmPass: ""
            })
            setResponse("Success")
        }
        catch(error){
            console.log(error.message)
            setError(
                <ErrorContainer>
                    <p>รหัสผ่านเก่าไม่ถูกต้อง</p>
                </ErrorContainer>
            )
            setResponse("Fail")
        }
    }

    return (
        <Container>
            <Response state={response} setState={setResponse} /> 
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
            <FormContainer onSubmit={submitHandle}>
                <Input>                     
                    <input type="text" id="username" required value={data.username} name="username" onChange={(e) => inputHandle(e)} />
                    <label htmlFor="username">ชื่อผู้ใช้</label>
                </Input>
                <Input>                     
                    <input type="text" id="username" required value={data.name} name="name" onChange={(e) => inputHandle(e)} />
                    <label htmlFor="username">ชื่อ นามสกุล</label>
                </Input>
                {error}
                <Input>                     
                    <input type="password" id="username" value={data.oldPass} name="oldPass" onChange={(e) => inputHandle(e)} />
                    <label htmlFor="username">รหัสผ่านเก่า</label>
                </Input>
                <Input>                     
                    <input type="password" id="username" value={data.newPass} name="newPass" onChange={(e) => inputHandle(e)} />
                    <label htmlFor="username">รหัสผ่านใหม่</label>
                </Input>
                <Input>                     
                    <input type="password" id="username" value={data.confirmPass} name="confirmPass" onChange={(e) => inputHandle(e)} />
                    <label htmlFor="username">ยืนยันรหัสผ่านใหม่</label>
                </Input>
                <button> <FontAwesomeIcon icon={['fas', 'save']} size="1x" /> บันทึก</button>
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

const ErrorContainer = styled.div`
    padding: 5px;
    margin-bottom: 25px;
    background: #d43434;
    color: #FFF;
    font-weight: 500;
    border-radius: 5px;

`

export default MyInfo;
