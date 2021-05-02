import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import {Button, None} from '../../styles/styleComponents'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import {useOrderContext} from '../../context/orderContext'
import CardOrder from './cardOrder'

const Modal = ({modal, setModal, parent}) => {
    const { orders } = useOrderContext()
    const modalElement = useRef()
    

    const isOutside = (e) => {
        if(!parent.current.contains(e.target) && !modalElement.current.contains(e.target)){
            setModal(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', isOutside)
        return () => {
            window.removeEventListener('click', isOutside)
        }
    }, [])

    return (
        <BoxModal modalHeight={modal ? "340px": "0"} ref={modalElement}>
            <TitleBox>
                <Title>ตระกร้าของฉัน</Title>
            </TitleBox>
            <Underline />

            <BoxCover>
                <Order>
                    {orders.length === 0 ? <NoProduct><h3>ไม่มีสินค้า</h3></NoProduct> : null}
                    {orders.map((product, index) => (<CardOrder product={product} key={index}/>))}
                </Order>
            </BoxCover>
            <Underline />
            <BoxCover>
                <ButtonBox>
                    <Link to="/cart">
                        <ButtonOrder> <FontAwesomeIcon icon={['fas', 'eye']} /> ดูหรือแก้ไขสินค้า</ButtonOrder>
                    </Link>
                </ButtonBox>
                <ButtonBox>
                    <Link to="/checkout">
                        <ButtonOrder>  <FontAwesomeIcon icon={['fas', 'shopping-cart']} /> ไปชำระเงิน</ButtonOrder>
                    </Link>            
                </ButtonBox>
            </BoxCover>

        </BoxModal>
    )
}

const BoxModal = styled.div`
    width: 320px;
    display: flex;
    position: fixed;
    transition: 0.25s;
    overflow: hidden;
    height: ${(props) => props.modalHeight};
    top: 80px;
    right: -10px;
    z-index: 30;
    margin-right: 5%;
    padding: 0px 0;
    flex-direction: column;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    border-radius: 5px;
    background: rgba(20,20,20,0.85);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    color: #FFF;
`
const BoxCover = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    flex-direction: column;
`
const TitleBox = styled.div`
    padding: 5px;

`
const Title = styled.h2`
    margin: 10px;
    font-weight: bold;
    letter-spacing: 1.3px;
    
`
const ButtonBox = styled.div`
    padding: 5px;
    margin-bottom: 10px;
`
const ButtonOrder = styled(Button)`
    background-color: #FFF;
    border: none;
    width: 275px;
    color: #111;
    :hover{
        background-color: #4297dd;
        color: #EFEFEF;
    }

`
const Underline = styled.div`
    width: 100%;
    height: 2px;
    background-color: gray;
`
const Order = styled.div`
    width: 100%;
    height: 100px;
    overflow-y: scroll;
    margin: 10px 0 10px 0;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar-track {
        background: rgba(20,20,20,0);
        
    }
    ::-webkit-scrollbar-thumb {
        background: #AAA; 
        border-radius :0; 
    }
`

const NoProduct = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    h3{
        margin-left: 10px;
        color: #CCC;
    }
`
export default Modal