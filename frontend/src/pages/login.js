import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {useSession} from '../context/session'
import {useHistory} from 'react-router-dom'
import logo from '../images/logo_large.webp'
import {Form, MainContainer, LoginContainer} from '../styles/styleComponents'

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
            <LoginContainer>
                <Logo>
                    <img src={logo} alt="" width="200px"/>
                </Logo>
                <Form  onSubmit={handleLogin}>
                        <div className="input">                     
                            <input type="text" id="username" value={username}  onChange={usernameHandle} required/>
                            <label htmlFor="username">Username</label>
                        </div>

                        <div className="input">    
                            <input type="password" id="password" value={password} onChange={passwordHandle} required/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <div>
                            <button>Login</button>
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