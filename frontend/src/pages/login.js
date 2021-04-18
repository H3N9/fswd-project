import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Login = () =>{
    const [loginData, setLoginData] = useState({username:"", password: ""})
    return(
        <MainContainer>
            <LoginContainer>
                <input type="text" placeholder="username" value={loginData.username}  onChange={(e) => setLoginData({username: e.target.value, password: loginData.password})}/>
                <input type="password"  placeholder="password" value={loginData.password} onChange={(e) => setLoginData({username: loginData.username, password: e.target.value})}/>
                <button onClick={() => console.log(loginData)}>Login</button>
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