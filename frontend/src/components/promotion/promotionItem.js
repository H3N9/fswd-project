import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PromotionItem = () => {
    return (
        <PromoItem name="Promotion Description">
            <div className="promotion-name" >
                <FontAwesomeIcon icon={['fas', 'tag']} size="2x" />
                <p>Promotion Name</p>
            </div>
            <div className="promotion-value">
                <h1><b>50 บาท</b></h1> 
                </div>
        </PromoItem>
    )
}



const PromoItem = styled.div`
    margin: 15px;
    width: 500px;
    background-image: linear-gradient(120deg,  #ff9b58, #fc6d0e);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    min-width: 400px;
    color: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    .promotion-name{
        display: flex;
        align-items: center;
        p{
            margin-left: 10px;
            font-size: 1.3rem;
            font-weight: 500;
        }
    }
    &:hover{
        :before{
            opacity: 1;
        }
    }
`


export default PromotionItem;                    