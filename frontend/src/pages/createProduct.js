import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const CreateProduct = () => {
    const [ product, setProduct ] = useState({
        title: "",
        publisher: "",
        author: "",
        price: 0,
        type: "",
        quantity: 0,
        description: ""
    })

    const inputHandle = (event) =>{
        const {name, value} = event.target
        setProduct({
                ...product,
                [name]: value
        })
    }

    return (
        <Container>
            
            <Flex>
                <FormFlex>
                    <FormContainer>
                        <h1>Create Product</h1>
                        <label htmlFor="">Title</label>
                        <input type="text" name="title" value={product.title} onChange={(e) => inputHandle(e)}/>
                        
                        <FromInline>
                            <div>
                                <label htmlFor="">Publisher</label>
                                <input className="publisher" type="text" name="publisher" value={product.publisher} onChange={(e) => inputHandle(e)}/>
                            </div>
                            <div>
                                <label htmlFor="">Author</label>
                                <input type="text" name="author" value={product.author} onChange={(e) => inputHandle(e)}/>
                            </div>   
                        </FromInline>
                       
                        <label htmlFor="">Type</label>
                        <input type="text" name="type" value={product.type} onChange={(e) => inputHandle(e)}/>                    
                        
                        <FromInline>
                            <div>
                                <label htmlFor="">Price</label>
                                <input type="number" min="0" name="price" value={product.price} onChange={(e) => inputHandle(e)}/>
                            </div>
                            <div>
                                <label htmlFor="">Quantity</label>
                                <input type="number" min="0" name="quantity" value={product.quantity} onChange={(e) => inputHandle(e)}/> 
                            </div>   
                        </FromInline>
                                   
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" cols="20" rows="5" name="description" value={product.description} onChange={(e) => inputHandle(e)}></textarea>
                        <button onClick={() => console.log(product)}>Create</button>
                    </FormContainer>
                    <ImageFormContainer>
                        <Image>
                            <button onClick={() => console.log(product)}><FontAwesomeIcon icon={['fas', 'plus']} /></button>
                        </Image>
                        
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
    border-radius: 10px;
    padding: 0px 20px 30px 20px;
    background-image: linear-gradient(120deg, #5128e6 , #2891e6);
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    margin-bottom: 30px;
`

const FormContainer = styled.div`
    width: 470px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;

    h1{
        align-self: flex-start;
        letter-spacing: -1px;
        color: #FFF;
        font-size: 50px;
        margin: 40px 0 30px 0;
        font-weight: bold;
        line-height: 100%;
        position: relative;
        :before{
            content: "";
            position: absolute;
            width: 80%;
            height: 3px;
            background: #fff;
            bottom: -10px;
        }
    }
    input, textarea{
        width: 100%;
        margin: 0 0 20px 0;
        box-shadow: inset 0px 1.5px 3px rgba(0, 0, 0, 0.9);
        outline: none;
        border: none;
        border-radius: 3px;
        font-size: 1rem;
        padding: 5px 0 5px 5px;
        resize: none;
    }
    label{
        align-self: flex-start;
        color: #FFF;
    }
    button{
        border: none;
        margin: 10px;
        color: #5128e6;
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
    background: #AAA;
    width: 100%;
    height: 65vh;
    border-radius: 5px;
    position: relative;
    button{
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        margin: 10px;
        color: #5128e6;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        font-size: 2rem;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        :active{
            transform: scale(0.9);
        }
    }
`

const FromInline = styled.div`
    display: flex;
    width:100%;
    flex: 1;
    justify-content: space-between;
    div{
        width: 45%;
        display: flex;
        flex-direction:column;
        input{

            flex: 1;        
        }
    }
`

export default CreateProduct;