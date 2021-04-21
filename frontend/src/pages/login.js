import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../images/logo_large.webp'
import {Form, MainContainer, LoginContainer} from '../styles/styleComponents'
const Login = () =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const usernameHandle = useCallback((e) => {
        setUsername(e.target.value)
    }, [])

    const passwordHandle = useCallback((e) => {
        setPassword(e.target.value)
    }, [])

    return(
        <MainContainer>
            <LoginContainer>
                <Logo>
                    <img src={logo} alt="" width="200px"/>
                </Logo>
                <Form>
                    <div className="input">                     
                        <input type="text" id="username" value={username}  onChange={usernameHandle} required/>
                        <label for="username">Username</label>
                    </div>

                    <div className="input">    
                        <input type="password" id="password" value={password} onChange={passwordHandle} required/>
                        <label for="password">Password</label>
                    </div>
                    <div>
                        <button onClick={() => console.log(password, username)}>Login</button>
                        <Link to={`/register`}>Register</Link>
                    </div>
                </Form>
            </LoginContainer>
        </MainContainer>
    );
}

const Logo = styled.div`
    max-width: 500px;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 5vmin;
    img{
        width: 40%;
        max-width: 200px;
        border-radius: 10px;
    }
`


export default Login;