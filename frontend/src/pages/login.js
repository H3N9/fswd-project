import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {useSession} from '../context/session'
import {useHistory} from 'react-router-dom'
import logo from '../images/logo.png'
import whiteLogo from '../images/logo-white.webp'
import {Form, MainContainer, LoginContainer, Input, LogoContainer} from '../styles/styleComponents'

const Login = () =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login, user } = useSession()
    const history = useHistory()


    useEffect(() => {
        console.log(user)
        if(user){
            history.push('/')
        }
    }, [user])

    const usernameHandle = useCallback((e) => {
        setUsername(e.target.value)
    }, [])

    const passwordHandle = useCallback((e) => {
        setPassword(e.target.value)
    }, [])


    const handleLogin = useCallback( async(e) => {
        e.preventDefault()
        const session = await login(username, password)
        if(session){
            history.push('/')
        }
        else{
            console.log("Password Wrong")
        }
        
    }, [login, password, username])

    return(
        <MainContainer>
            <LogoContainer>
                <Logo>
                    <img src={whiteLogo} alt="" width="390px"/>
                </Logo>
            </LogoContainer>
            <LoginContainer>   
                <Form onSubmit={handleLogin}>
                    <img src={logo} alt="" width="250px"/>
                    <h1>เข้าสู่ระบบ</h1>
                        <Input>                     
                            <input type="text" id="username" value={username}  onChange={usernameHandle} required/>
                            <label htmlFor="username">ชื่อผู้ใช้</label>
                        </Input>

                        <Input>    
                            <input type="password" id="password" value={password} onChange={passwordHandle} required/>
                            <label htmlFor="password">รหัสผ่าน</label>
                        </Input>
                        <div>
                            <button>เข้าสู่ระบบ</button>
                            <Link to={`/register`}>สมัครสมาชิก</Link>
                        </div>
                </Form>
            </LoginContainer>
        </MainContainer>
    );
}

const Logo = styled.div`
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 5vmin;
    img{
        width: 100%;
        max-width: 400px;
        border-radius: 10px;
    }
`


export default Login;