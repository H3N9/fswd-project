import React, {useState,} from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@apollo/client'
import { Header, Input, FormContainer } from '../styles/styleComponents'
import { CONFIRM_ORDER } from '../graphql/orderMutation'
import Response from '../components/response'

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
        reader.readAsDataURL(files[0])
        setImgPath(files[0])
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        if (image){
            const formData = new FormData()
            formData.append('image', imgPath)

            const uploadResponse = await fetch('http://localhost:3001/image', { 
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
            </Header>
            <Flex>
                <ImageFormContainer>
                    <Image>
                        <FontAwesomeIcon icon={['fas', 'image']} size="9x" /> 
                        <img src={image} alt=""/>
                    </Image>
                    <InputWrapper>
                        <div>
                            <input type="file" id="image" name="image" accept="image/jpeg" onChange={(e) => inputHandle(e)}/> 
                            <label htmlFor="image"><FontAwesomeIcon icon={['fas', 'plus']} /> อัปโหลดหลักฐานการชำระ</label>
                        </div>
                    </InputWrapper>
                    <FormContainer onSubmit={submitHandle}>
                        <Input>
                            <button><FontAwesomeIcon icon={['fas', 'check']} /> แจ้งการชำระเงิน</button>
                        </Input>
                    </FormContainer>         
                </ImageFormContainer>
            </Flex>
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5% 0 5%;
    
`
const Flex = styled.div`
    display: flex;
    justify-content:center;
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
    height: 600px;
    border: 2px solid rgba(180,180,180, 1);
    border-style: dashed;
    text-align: center;
    overflow: hidden;
    position: relative;
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
        width: 100%;
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
        background: blue;
        width: 100%;
        text-align: center;
    }
    input{
        width:100%;
        height: 50px;
        background: blue;
        opacity: 1;
        margin: 0;
        padding: 0;
        position: relative;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        :before{
            content: "";
            position: absolute;
            background: #FFF;
            width: 100%;
            height: 100%;
            text-align: center;
            cursor: pointer;
            background: #5128e6
        }
        
    }
    label{
        position: relative;
        top: -37px;
        color: #FFF;
        font-size: 1.1rem;
    }
`


export default Payment