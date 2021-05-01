import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {REGISTER_MUTATION} from '../graphql/registerMutation'
import { validate } from 'graphql'
import whiteLogo from '../images/logo-white.webp'
import logo from '../images/logo.png'
import {Form, MainContainer, LoginContainer, Input, LogoContainer} from '../styles/styleComponents'
import { useSession } from '../context/session'

const Register = () =>{
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [ error, setError ] = useState(<></>)
    const [register] = useMutation(REGISTER_MUTATION)
    const history = useHistory()
    const { user } = useSession()

    useEffect(() => {
        console.log(user)
        if(user){
            history.push('/')
        }
    }, [user])

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirm = (e) => {
        setConfirm(e.target.value)
    }

    const handleRegister = async () => {
        try{
            await register({variables: {object:{username, name, password}}})
            setError(
                <ErrorContainer style={{background: "#43c443"}}>
                    <p>Account Create Successfully </p>
                </ErrorContainer>
            )
        }
        catch(e){
            console.log("Error username already existed!!!")
        }
    }


    const Validate = (e) =>{
        e.preventDefault()
        if(password !== confirm){
            console.log("Asd")

            setError(
                <ErrorContainer>
                    <p>รหัสผ่านกับ ยืนยันรหัสผ่านไม่ตรงกัน</p>
                </ErrorContainer>
            )
        }
        else{
            handleRegister()
        }
    }
    return(
        <MainContainer>
            <LogoContainer>
                <Logo>
                    <img src={whiteLogo} alt="" width="390px"/>
                </Logo>
            </LogoContainer>
            <LoginContainer>
                       
                <Form onSubmit={Validate}>
                    <img src={logo} alt="" width="250px"/>
                    <h1>ลงทะเบียน</h1>  
                    {error}
                    <Input>                     
                        <input type="text" id="username" value={username} required name="username" onChange={handleUsername}/>
                        <label htmlFor="username">ชื่่อผู้ใช้</label>
                    </Input>
                    <Input>
                        <input type="text"  id="name" value={name} required name="name" onChange={handleName}/>
                        <label htmlFor="name">ชื่อ นามสกุล</label>
                    </Input>
                    <Input>
                        <input type="password"  id="password" value={password} required name="password" onChange={handlePassword}/>
                        <label htmlFor="password">รหัสผ่าน</label>
                    </Input>
                    <Input>
                        <input type="password"  id="confirm-password" value={confirm} required name="confirm" onChange={handleConfirm}/>
                        <label htmlFor="confirm-password">ยืนยันรหัสผ่าน</label>
                    </Input>
                    <div>
                        <button>ลงทะเบียน</button>
                        <Link to={`/login`}>ไปหน้าเข้าสู่ระบบ</Link>
                    </div>
                </Form>            
            </LoginContainer>
        </MainContainer>
    );
}


const ErrorContainer = styled.div`
    padding: 5px;
    margin-bottom: 25px;
    background: #d43434;
    color: #FFF;
    font-weight: 500;
    border-radius: 5px;

`

const Logo = styled.div`
    max-width: 500px;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 5vmin;
    display: flex;
    justify-content: center;
    img{
        width: 100%;
        max-width: 400px;
        border-radius: 10px;
    }
`


export default Register;