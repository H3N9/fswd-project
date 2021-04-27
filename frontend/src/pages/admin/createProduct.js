import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useMutation} from '@apollo/client'
import {CREATE_PRODUCT} from '../../graphql/productMutation'
import {Input} from '../../styles/styleComponents'
import { useHistory } from "react-router-dom"
import Response from '../../components/response'
import {FormContainer} from '../../styles/styleComponents'


const CreateProduct = () => {
    const [ product, setProduct ] = useState({
        title: "",
        publisher: "",
        author: "",
        price: 0,
        types: "",
        quantity: 0,
        description: "",
        image: ""
    })
    const [image, setImage] = useState();
    const history = useHistory();
    const [isCreate, setIsCreate] = useState(undefined);
    const [createProduct] = useMutation(CREATE_PRODUCT)

    const inputHandle = (event) =>{
        const {name, value, files} = event.target
        if (name !== "image"){
            setProduct({
                ...product,
                [name]: value
            })
        }
        else{
            const reader = new FileReader();
            reader.onload = () =>{
                if (reader.readyState === 2){
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(files[0])
            setProduct({
                ...product,
                [name]: files[0]
            })
        }
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const { image, quantity, price } = product
        const objInput = {...product, quantity: Number(quantity), price: Number(price) }
        let filename = ''
        if (image !== ''){
            const formData = new FormData()
            formData.append('image', image)

            const uploadResponse = await fetch('http://localhost:3001/image', { 
                method: 'POST',
                body: formData
            })
            const fileData = await uploadResponse.json()
            filename = fileData.filename
        }
        objInput.image = filename

        try {
            const response = await createProduct({variables: {object: objInput}})
            console.log(response)
            setIsCreate("Success")
            setTimeout(() => history.push("/admin/products"), 3000);
        } catch (error) {
            console.log(error)
            setIsCreate("Fail")
        }
    }

    return (
        <Container>
            <Response state={isCreate} setState={setIsCreate} />
            <Flex>
                <FormFlex>
                    <FormContainer onSubmit={submitForm}>
                        <h1>เพิ่มสินค้า</h1>
                        <Input>       
                            <input type="text" name="title" id="title" value={product.title} required onChange={(e) => inputHandle(e)}/>
                            <label htmlFor="title">ชื่อ</label>
                        </Input>                
                        <FromInline>
                            <Input>                           
                                <input id="publisher" type="text" name="publisher" required value={product.publisher} onChange={(e) => inputHandle(e)}/>
                                <label htmlFor="publisher">สำนักพิมพ์</label>
                            </Input>
                            <Input>                      
                                <input id="author" type="text" name="author" required value={product.author} onChange={(e) => inputHandle(e)}/>
                                <label htmlFor="author">ผู้เขียน</label>
                            </Input>   
                        </FromInline>
                       
                       <Input>       
                            <select type="text" name="types" id="types" value={product.types} required onChange={(e) => inputHandle(e)}>
                                <option value="Normal">Normal</option>
                                <option value="Dramas">Dramas</option>
                                <option value="Cosmoslogy">Cosmoslogy</option>
                            </select>               
                            <label htmlFor="types">ประเภท</label>
                       </Input>
                        
                        <FromInline>
                            <Input>                           
                                <input type="number" min="0" name="price" id="price" value={product.price} required onChange={(e) => inputHandle(e)}/>
                                <label htmlFor="price">ราคา (บาท)</label>
                            </Input>
                            <Input>
                                <input type="number" min="0" name="quantity" value={product.quantity} required onChange={(e) => inputHandle(e)}/> 
                                <label htmlFor="">จำนวน</label>
                            </Input>   
                        </FromInline>
                                   
                        <Input>
                            <textarea name="" id="" cols="20" rows="5" name="description" value={product.description} onChange={(e) => inputHandle(e)}></textarea>
                            <label htmlFor="">คำอธิบาย</label>
                        </Input>
                        <button><FontAwesomeIcon icon={['fas', 'check']} /> ยืนยัน</button>
                    </FormContainer>




                    <ImageFormContainer>
                        <Image>
                            <FontAwesomeIcon icon={['fas', 'image']} size="9x" /> 
                            <img src={image} alt=""/>
                        </Image>
                        <InputWrapper>
               
                            <div>
                                <input type="file" id="image" name="image" accept="image/jpeg" onChange={(e) => inputHandle(e)}/> 
                                <label htmlFor="image"><FontAwesomeIcon icon={['fas', 'image']} /> อัปโหลดหน้าปก</label>
                            </div>
                        </InputWrapper>             
                    </ImageFormContainer>
                </FormFlex> 
            </Flex> 
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5% 0 5%;

`
const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`
const FormFlex = styled.div`
    display: flex;
    width: 95%;
    justify-content: space-around;
    flex-wrap: wrap-reverse;
    border-radius: 5px;
    padding: 0px 20px 30px 20px;
    margin-bottom: 30px;
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
    height: 500px;
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

const FromInline = styled.div`
    display: flex;
    width:100%;
    flex: 1;
    justify-content: space-between;
    div{
        width: 48%;

    }
`

export default CreateProduct;