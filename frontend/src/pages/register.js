import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {REGISTER_MUTATION} from '../graphql/registerMutation'
import { validate } from 'graphql'
import {Form, MainContainer, LoginContainer} from '../styles/styleComponents'

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
                    <p>Password not match with confirm password</p>
                </ErrorContainer>
            )
        }
        else{
            handleRegister()
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
                <h1>Register</h1>
                {error}

                <Logo>
                    <h1>Register</h1>
                </Logo>
                
                <Form onSubmit={Validate}>
                    {error}
                    <div className="input">                     
                        <input type="text" id="username" value={registerData.username} required name="username" onChange={handleUsername}/>
                        <label for="username">Username</label>
                    </div>
                    <div className="input">
                        <input type="text"  id="name" value={registerData.password} required name="name" onChange={handleName}/>
                        <label for="name">Name</label>
                    </div>
                    <div className="input">
                        <input type="password"  id="password" value={registerData.password} required name="password" onChange={handlePassword}/>
                        <label for="password">Password</label>
                    </div>
                    <div className="input">
                        <input type="password"  id="confirm-password" value={registerData.confirm} required name="confirm" onChange={handleConfirm}/>
                        <label for="confirm-password">Confirm Password</label>
                    </div>
                    <div>
                        <button>Register</button>
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