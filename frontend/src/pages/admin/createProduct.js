import React, {useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Input} from '../../styles/styleComponents'
const CreateProduct = () => {
    const [ product, setProduct ] = useState({
        title: "",
        publisher: "",
        author: "",
        price: 0,
        type: "",
        quantity: 0,
        description: "",
        image: ""
    })
    const [image, setImage] = useState();

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
    return (
        <Container>
            
            <Flex>
                <FormFlex>
                    <FormContainer>
                        <h1>เพิ่ม/แก้ไข สินค้า</h1>
                        <Input>       
                            <input type="text" name="title" id="title" value={product.title} required onChange={(e) => inputHandle(e)}/>
                            <label for="title">ชื่อ</label>
                        </Input>
                      
                        
                        <FromInline>
                            <Input>                           
                                <input id="publisher" type="text" name="publisher" required value={product.publisher} onChange={(e) => inputHandle(e)}/>
                                <label for="publisher">สำนักพิมพ์</label>
                            </Input>
                            <Input>                      
                                <input id="author" type="text" name="author" required value={product.author} onChange={(e) => inputHandle(e)}/>
                                <label for="author">ผู้เขียน</label>
                            </Input>   
                        </FromInline>
                       
                       <Input>       
                            <input type="text" name="type" id="type" value={product.type} required onChange={(e) => inputHandle(e)}/>                    
                            <label for="type">ประเภท</label>
                       </Input>
                        
                        <FromInline>
                            <Input>                           
                                <input type="number" min="0" name="price" id="price" value={product.price} required onChange={(e) => inputHandle(e)}/>
                                <label for="price">ราคา (บาท)</label>
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
                        
                        <button onClick={() => console.log(product)}>ยืนยัน</button>
                    </FormContainer>
                    <ImageFormContainer>
                        <Image>
                            <img src={image} alt=""/>
                        </Image>
                        <InputWrapper>
               
                            <div>
                                <input type="file" id="image" name="image" accept="image/*" onChange={(e) => inputHandle(e)}/> 
                                <label htmlFor="image">อัปโหลดหน้าปก</label>
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

const FormContainer = styled.div`
    width: 500px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    h1{
        align-self: flex-start;
        letter-spacing: -2px;
        font-size: 50px;
        margin: 40px 0 30px 0;
        line-height: 100%;
        position: relative;
        :before{
            content: "";
            position: absolute;
            width: 80%;
            height: 3px;
            background: #111;
            bottom: -10px;
        }
    }
    input, textarea{
        outline: none;
        resize: none;
    }
    label{
        align-self: flex-start;
    }
    button{
        border: none;
        margin: 10px;
        background: #3fb161;
        color: #fff;
        height: 50px;
        width: 50%;
        text-align: center;
        font-size: 1.3rem;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        :active{
            transform: scale(0.9);
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
    height: 500px;
    border: 2px solid #666;
    border-style: dashed;
    img{
        width: 100%;
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