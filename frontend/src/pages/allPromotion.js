import React, {useState} from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { PRODUCT_QUERY } from '../graphql/productQuey'
import { useQuery } from '@apollo/client'
import {Input, Header} from '../styles/styleComponents'
import CatgoriesProducts from '../components/home/catgoriesProducts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PromotionItem from "../components/promotion/promotionItem"

const AllPromotion = () => {
    const query = new URLSearchParams(useLocation().search)
    const initPage = Number(query.get("page")) || 1
    const { data, count } = useQuery(PRODUCT_QUERY)
    console.log(data)
    const products = data?.products || []


    return (
        <Container>      
            <Header>
                <h1>โปรโมชั่น</h1>
            </Header>
            <PromoFlex>
                <div className="item-wrapper">
                    <PromotionItem />
                </div>
                <div className="item-wrapper">
                    <PromotionItem />
                </div>
                <div className="item-wrapper">
                    <PromotionItem />
                </div>
                <div className="item-wrapper">
                    <PromotionItem />
                </div>
            </PromoFlex>
            <CatgoriesProducts products={products} title={"สินค้าโปรโมชั่น"}/>  
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 4%;
`

const PromoFlex = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(500px, 1fr) );

    margin-bottom: 50px;
    max-height: 500px;
    overflow-y: scroll;
    .item-wrapper{
        display: flex;
        justify-content:center;
    }
    
    @media (max-width: 580px){
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    @media (max-width: 414px){
        max-height: 280px;
    }
`



export default AllPromotion;                    