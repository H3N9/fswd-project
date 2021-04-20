import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {REGISTER_MUTATION} from '../graphql/registerMutation'
import { validate } from 'graphql'

const Register = () =>{
    const [registerData, setRegisterData] = useState({username:"", password: "", confirm: ""})
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [ error, setError ] = useState(<></>)
    const [register] = useMutation(REGISTER_MUTATION)

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
                    <p>password not match with confirm password</p>
                </ErrorContainer>
            )
        }
        else{
            handleRegister()
        }
    }
    return(
        <MainContainer>
            <LoginContainer>
                <h1>Register</h1>
                {error}
                <form onSubmit={Validate}>
                    <input type="text" placeholder="username" value={username}  required onChange={handleUsername}/>
                    <input type="text" placeholder="name" value={name}  required onChange={handleName}/>
                    <input type="password"  placeholder="password" value={password} required onChange={handlePassword}/>
                    <input type="password"  placeholder="confirm password" value={confirm} required onChange={handleConfirm}/>
                    <button>Register</button>
                </form>
                
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