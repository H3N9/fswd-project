import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {Form, MainContainer, LoginContainer} from '../styles/styleComponents'

const Register = () =>{
    const [registerData, setRegisterData] = useState({username:"", password: "", confirm: ""});
    const [ error, setError ] = useState(<></>);
    
    
    const inputHandle = (event) =>{
        const {name, value} = event.target
        setRegisterData({
                ...registerData,
                [name]: value
        })
    }

    const Validate = () =>{
        console.log(registerData)
        if(registerData.password !== registerData.confirm){
            setError(
                <ErrorContainer>
                    <p>Password not match with confirm password</p>
                </ErrorContainer>
            )
        }
        else{
            setError(
                <ErrorContainer style={{background: "#62bd62"}}>
                    <p>Account Create Successfully </p>
                </ErrorContainer>
            )
        }
    }
    return(
        <MainContainer>
            <LoginContainer>
                <Logo>
                    <h1>Register</h1>
                </Logo>
                
                <Form>
                    {error}
                    <div className="input">                     
                        <input type="text" id="username" value={registerData.username} required name="username" onChange={(e) => inputHandle(e)}/>
                        <label for="username">Username</label>
                    </div>
                    <div className="input">
                        <input type="password"  id="password" value={registerData.password} required name="password" onChange={(e) =>  inputHandle(e)}/>
                        <label for="password">Password</label>
                    </div>
                    <div className="input">
                        <input type="password"  id="confirm-password" value={registerData.confirm} required name="confirm" onChange={(e) =>  inputHandle(e)}/>
                        <label for="confirm-password">Confirm Password</label>
                    </div>
                    <div>
                        <button onClick={() => Validate()}>Register</button>
                        <Link to={`/login`}>Back to login</Link>
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
    h1{
        letter-spacing: -1px;
        font-size: 4rem;
        position: relative;
        width: fit-content;
        color: #222;
        :before{
            content: "";
            position: absolute;
            width: 70%;
            bottom: -5px;
            height: 4px;
            background: #222;
        }
    }
`


export default Register;