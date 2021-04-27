import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PromotionItem = () => {
    return (
        <PromoItem name="Promotion Description">
            <div className="promotion-detail" >
                <div className="promotion-name">
                    <FontAwesomeIcon icon={['fas', 'tag']} size="2x" />
                    <p>Promotion Name</p>
                </div>
                <h1><b>50 บาท</b></h1> 
            </div>
            <div className="promotion-value">
                <h3>คงเหลือ <b>2</b> ครั้ง</h3> 
            </div>
        </PromoItem>
    )
}



const PromoItem = styled.div`
    margin: 10px;
    max-width: 500px;
    width: 100%;
    background-image: linear-gradient(120deg,  #ff9b58, #fc6d0e);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-radius: 15px;
    transition: 0.25s;
    padding: 20px;
    position: relative;
    &:before{
        content: attr(name);
        font-size: 1.2rem;
        border-radius: 15px;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(120deg,  #fa8d45, #fc6d0e);
        color: #FFF;
        position: absolute;
        margin: 0;
        top: 0;
        left: 0;
        transition: 0.25s;
        opacity: 0;
        padding: 10px;
        box-sizing: border-box; 
    }
    .promotion-detail{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        h1{
            line-height: 1;
            margin-left: 7.5px;
        }
        .promotion-name{
            display: flex;
            align-items: center;
            
            p{
                margin-left: 10px;
                font-size: 1.3rem;
                font-weight: 500;
            }
        }
    }
    .promotion-value{
        h3{
            margin: 0;
            font-size: 1.3rem;
            padding: 0 25px; 
            text-align: center;
            background: #FFF;
            color:#fa8d45;
            border-radius: 5px;
        }
    }
    &:hover{
        :before{
            opacity: 1;
        }
    }
`


export default PromotionItem;                    