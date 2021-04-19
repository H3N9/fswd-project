import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
                <input type="text" placeholder="username" value={username}  onChange={usernameHandle}/>
                <input type="password"  placeholder="password" value={password} onChange={passwordHandle}/>
                <button onClick={() => console.log(password, username)}>Login</button>
                <Link to={`/register`}>Register</Link>

            </LoginContainer>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    width:100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LoginContainer = styled.div`
    background: rgba(0,0,0, 0.9);
    border-radius: 5px;
    width: 320px;
    padding: 20px;
    input{
        outline: none;
        margin: 20px 0;
        position: relative;
    }

    a{
        margin: 20px 0;
        text-decoration: none;
        color: #FFF;
        text-align: center;
    }
    display: flex;
    flex-direction: column;
`



export default Login;