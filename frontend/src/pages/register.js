import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Register = () =>{
    const [registerData, setRegisterData] = useState({username:"", password: "", confirm: ""});
    const [ error, setError ] = useState(<></>);

    const Validate = () =>{
        if(registerData.password !== registerData.confirm){
            console.log("Asd")
            setError(
                <ErrorContainer>
                    <p>password not match with confirm password</p>
                </ErrorContainer>
            )
        }
        else{
            setError(
                <ErrorContainer style={{background: "#43c443"}}>
                    <p>Account Create Successfully </p>
                </ErrorContainer>
            )
        }
    }
    return(
        <MainContainer>
            <LoginContainer>
                <h1>Register</h1>
                {error}
                <input type="text" placeholder="username" value={registerData.username}  required onChange={(e) => setRegisterData({username: e.target.value, password: registerData.password, confirm: registerData.confirm})}/>
                <input type="password"  placeholder="password" value={registerData.password} required onChange={(e) => setRegisterData({username: registerData.username, password: e.target.value, confirm: registerData.confirm})}/>
                <input type="password"  placeholder="confirm password" value={registerData.confirm} required onChange={(e) => setRegisterData({username: registerData.username, password: registerData.password, confirm: e.target.value})}/>
                <button onClick={() => Validate()}>Register</button>
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
    display: flex;
    flex-direction: column;
    h1{
        color: #FFF;
    }
    input{
        outline: none;
        margin: 20px 0;
    }

    button{
        margin: 20px 0;
        padding: 10px 0;
        font-size: 1.2rem;
        text-decoration: none;
        text-align: center;
    }

`

const ErrorContainer = styled.div`

    padding: 10px;
    background: #d43434;
    color: #FFF;

`



export default Register;