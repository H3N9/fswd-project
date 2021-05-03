import React, {useState,} from 'react'
import styled from 'styled-components'
import { Redirect, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@apollo/client'
import { Header, Input, FormContainer } from '../styles/styleComponents'
import { CONFIRM_ORDER } from '../graphql/orderMutation'
import Response from '../components/response'
import pay from '../images/promptpay.jpg'
import { main } from '../path'

const Payment = () => {
    const [ image, setImage ] = useState()
    const [ imgPath, setImgPath ] = useState("")
    const [ confirmOrder ] = useMutation(CONFIRM_ORDER)
    const [confirmResponse, setConfirmResponse] = useState(undefined)

    const history = useHistory()

    const inputHandle = (event) =>{
        const {name, value, files} = event.target
        const reader = new FileReader();
        reader.onload = () =>{
            if (reader.readyState === 2){
                 setImage(reader.result)
            }
        }
        try{
            reader.readAsDataURL(files[0])
            setImgPath(files[0])
        }
        catch(error){
            console.log(error)
        }    
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        if (image){
            const formData = new FormData()
            formData.append('image', imgPath)

            const uploadResponse = await fetch(`${main}/image`, { 
                method: 'POST',
                body: formData
            })
            const fileData = await uploadResponse.json()
            const filename = fileData.filename
            try{
                const response = await confirmOrder({variables: {imagePayment: filename}})
                setConfirmResponse('Success')
                setTimeout(() => history.push("/customer/orders"), 3000);
            }
            catch(error){
                setConfirmResponse('Fail')
                console.log(error.message)
            }
        }
    }

    return (
        <Container>
            <Response state={confirmResponse} setState={setConfirmResponse} />
            <Header>
                <h1>การชำระเงิน</h1>
                <form onSubmit={submitHandle} >
                    <button disabled={imgPath === "" ? true : false}><FontAwesomeIcon icon={['fas', 'check']} /> แจ้งการชำระเงิน</button>   
                </form> 
            </Header>
            <Flex>
                
                <PaymentContainer>
                    <Account>
                        <p><b>เลขบัญชี : </b>0123456789</p>
                        <button onClick={() => {navigator.clipboard.writeText("0123456789")}}>คัดลอก</button>
                    </Account>
                    <img src={pay} alt=""/>
                </PaymentContainer>          
                <ImageFormContainer>            
                    <Image>
                        <FontAwesomeIcon icon={['fas', 'image']} size="9x" /> 
                        <img src={image} alt=""/>
                    </Image>
                    <InputWrapper>
                        <Box>
                            <input type="file" id="image" name="image" accept="image/jpeg" onChange={(e) => inputHandle(e)}/> 
                            <label htmlFor="image"><FontAwesomeIcon icon={['fas', 'plus']} /> อัปโหลดหลักฐานการชำระ</label>
                        </Box>
                    </InputWrapper>     
                </ImageFormContainer>
            </Flex>
        </Container>
    )
}

const Box = styled.div`
    color: white;
    transition: 0.5s;
    :hover{
        color: #5128e6;
    }
`

const Container = styled.div`
    padding: 100px 5% 0 5%;
    
`
const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around;
`

const PaymentContainer = styled.div`
    width: 450px;
    height: fit-content;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    border-radius: 10px;
    img{
        width: 100%;
    }
    p{
        text-align: center;
        font-size: 1.1rem;
    }
`
const Account = styled.div`
    display: flex;
    justify-content:center;
    button{
        background: #5128e6;
        margin: 10px 0 10px 5px;
        border: none;
        border-radius: 5px;
        color: #FFF;
        font-size: 1rem;
        position: relative;
        :before{
            content: "คัดลอกแล้ว";
            width: 100px;
            height: 100%;
            background: rgba(0,0,0,0.75);
            position: absolute;
            top: -110%;
            left: -30%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            opacity: 0;
            transition: 0.25s;
        }
        :focus{
            :before{
                content: "คัดลอกแล้ว";
                opacity: 1;
            }
        }
    }
`
const ImageFormContainer = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;

`
const Image = styled.div`
    background: rgba(200,200,200, 0.5);
    border-radius: 5px;
    width: 100%;
    height: 580px;
    border: 2px solid rgba(180,180,180, 1);
    border-style: dashed;
    text-align: center;
    overflow: hidden;
    position: relative;
    display:flex;
    justify-content:center;
    align-items: center;
    svg{
        color: rgba(190,190,190, 1);
        position: absolute;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: -1;
        transform: translate(-50%, -50%);
    }
    img{
        z-index: 1;
        width: 80%;
        border-radius: 5px;
        margin: 0;
    }
`
const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width:50%;
    text-align: center;
    margin-top: 20px;
    p{
        width: 100%;
        text-align: center;
    }
    input{
        width:100%;
        height: 50px;
        opacity: 1;
        margin: 0;
        padding: 0;
        position: relative;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        :before{
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            text-align: center;
            cursor: pointer;
            background: #5128e6;
            transition: 0.25s;
        }
        :hover::before{
            background-color: white;
            color: red;
        }
        
        
    }
    label{
        position: relative;
        top: -37px;
        font-size: 1.1rem;
        cursor: pointer;
    }
`


export default Payment
