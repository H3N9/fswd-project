import React, { useState } from 'react'
import styled from 'styled-components'
import {Input} from '../../styles/styleComponents'
import ModalResult from '../modalResult'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductForm = ({ title, product, image, inputHandle, submitForm, discountHandle, discount }) => {

    return (
        <Container>
            <Flex>
                <FormFlex>
                    <FormContainer onSubmit={submitForm}>
                        <h1>{title}</h1>
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
                            <textarea id="" cols="20" rows="5" name="description" value={product.description} onChange={(e) => inputHandle(e)}></textarea>
                            <label htmlFor="">คำอธิบาย</label>
                        </Input>


                        <h1>Create Discount</h1>
                       <Input>
                            <select type="text" name="method" id="method" value={discount.method} required onChange={(e) => discountHandle(e)}>
                                <option value="DISCOUNT">Discount</option>
                                <option value="PERCENT">Percent</option>
                            </select>               
                            <label htmlFor="method">ประเภท</label>
                        </Input>
                        <Input>       
                            <input type="number" name="discountValue" id="discountValue" value={discount.discountValue} required onChange={(e) => discountHandle(e)}/>                    
                            <label htmlFor="discountValue">Value</label>
                       </Input>
                        <Input>       
                            <textarea id="" cols="20" rows="5" name="descriptionDiscount" value={discount.descriptionDiscount} onChange={(e) => discountHandle(e)}></textarea>
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

const FormContainer = styled.form`
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
            width: 100%;
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

export default ProductForm