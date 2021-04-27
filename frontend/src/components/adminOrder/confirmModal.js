import React, { createRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from "prop-types"
import { useOrderContext } from '../../context/orderContext'
const ConfirmModal = ({status, setStatus, setIsModal, isModal}) => {
    let disableButton = status === "" ? true : false;
    const handle  = () =>{
        console.log(status)
        setIsModal(false)
    }
    return (
            <Container isModal={isModal}>
                <Card>
                    <div className="header">
                        <p>โปรดเลือกสถานะของออร์เดอร์</p>
                    </div>
                    <div className="content">
                        <div className="radio-input">
                            <input type="radio" name="status" id="shipping" value="shipping" checked={status === "shipping" ? true : false} onClick={(e) => setStatus(e.target.value)}/>
                            <label htmlFor="shipping">จัดส่ง</label>
                        </div>
                        <div className="radio-input">
                            <input type="radio" name="status" id="closed" value="closed" checked={status === "closed" ? true : false}  onClick={(e) => setStatus(e.target.value)}/>
                            <label htmlFor="closed">ปิดออร์เดอร์</label>
                        </div>
                    </div>
                    <div className="menu">
                        <button onClick={() => handle()} disabled={disableButton}> ยืนยัน</button>
                        <button onClick={() => handle()}>ยกเลิก</button>
                    </div>
                </Card>
            </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: ${(props) => props.isModal ? "100vh" : 0};
    position: fixed;
    background: rgba(0,0,0,0.75);
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    opacity: ${(props) => props.isModal ? "1" : 0};
    transition: opacity 0.25s 0s, height 0s 0.1s;
`

const Card = styled.div`
    width: 500px;
    border-radius: 7px;
    background: #FFF;
    padding: 10px 10px;
    margin: 0 20px;
    font-size: 1.2rem;
    .header{
        p{
            margin: 5px 0;
        }
        border-bottom: 1px solid #ccc;
    }
    .content{
        display: flex;
        flex-direction: column;
        .radio-input{
            padding: 10px 0px;
            margin: 10px 0;
            /* border: 3px solid #5128e6; */
            display: flex;
            align-items: center;
            input{
                    width: 20px;
                    height: 20px;
                &:checked{
                    content: "asd";
                    font-size: 20px;
                    line-height: 20px;
                    color: #b7b7b7;
                    display: block;
                    width: 20px;
                    height: 20px;
                    border-radius: 3px;
                }
                &:after{
                    background: red;
                    height: 5px;
                    width: 5px;
                }
            }
            label{
                flex: 1;
                padding: 10px 0;
                margin-left: 5px;
            }
        }

    }
    .menu{
        display: flex;
        justify-content: center;
        button{
            font-size: 1rem;
            border-radius: 5px;
            margin: 0 10px;
            border: none;
            padding: 10px 25px;
            &:first-child{
                background: #222;
                color: #FFF;
            }
            &:last-child{
                color: #222;
                background: transparent;
            }
        }
    }
`

export default ConfirmModal;