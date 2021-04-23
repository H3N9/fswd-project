import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Promotions = () => {


    return (
        <Container>
            <Header>
                <h1>จัดการโปรโมชั่น</h1>
                <Link to={`/login`}><FontAwesomeIcon icon={['fas', 'plus']} /> เพิ่มโปรโมชั่น</Link>
            </Header>
            <Flex>
                <PromotionItem>
                    <Id>
                        <h1>1</h1>
                    </Id>
                    <Info>
                        <Name>
                            <h2>Promotion Description</h2>
                        </Name>
                        <Detail>
                            <p><b>ประเภทโปรโมชั่น :</b> คูปอง</p>
                            <p><b>รูปแบบส่วนลด : </b> เปอร์เซ็นต์</p>
                            <p><b>สร้างเมื่อ :</b> -</p>
                            <p><b>อัปเดทเมื่อ :</b> -</p>
                        </Detail>
                        <Option>
                            <button className="delete" name="ลบโปรโมชั่น" ><FontAwesomeIcon icon={['fas', 'trash-alt']}/></button>
                            <button className="edit"  name="แก้ไขโปรโมชั่น"><FontAwesomeIcon icon={['fas', 'edit']} /></button>
                        </Option>
                    </Info>
                    
                </PromotionItem>
            </Flex>
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    h1{
        margin: 0;
        font-size: clamp(2rem, 5vmin, 2.5rem);
    }
    a{
        text-decoration:none;
        color: #FFF;
        background: #2fb12f;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 10px;
    }
`
const Flex = styled.div`
    display: flex;
    margin-top: 50px;
    justify-content: center;

`
const PromotionItem = styled.div`
    width: 1000px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    display: flex;
    align-items: center;
    border-radius: 10px;
    color :#FFF;
    padding: 10px 0;
    background-image: linear-gradient(120deg, #5128e6 , #2891e6);
`

const Info = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width:100%;
`

const Id = styled.div`
    width: 100px;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
`

const Name = styled.div`
    flex: 1;
    flex-basis: 300px;
    padding-right:10px;
    height: 100%;
    display:flex;
    align-items: center;
`

const Detail = styled.div`
    height: 100%;
    flex-basis: 300px;
    p{
        margin: 10px 0;
        font-size: 1.1rem;
        b{
            font-weight: 500;
        }
    }
`

const Option = styled.div`
    display: flex;
    height: 80px;
    align-items: flex-start;
    button{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0px 25px 0px 0;
        border: none;
        position: relative;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        svg{
            font-size: 20px;
            color: #111;
            transition: 0.25s;
        }
        &.delete{
            :hover{
                background: #df2b2b;
            }          
        }
        &.edit{
            :hover{
                background: #df6b1e;
            }          
        }
        :hover{
            svg{
                color: #FFF;
            }
            :before{
                opacity: 1;
            }
        }
        :before{
            position: absolute;
            content: attr(name);
            width: 100px;
            font-size: 1rem;
            top: -40px;
            left: -30px;
            color: #FFF;
            border-radius: 5px;
            padding: 5px 10px;
            transition: 0.25s;
            background: rgba(0,0,0,0.75);
            opacity: 0;
            @media (max-width: 1000px){
                display: none;
            }
        }
    }
`


export default Promotions;