import React, {useState} from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { PRODUCT_QUERY } from '../graphql/productQuey'
import { PROMOTIONS_QUERY } from '../graphql/promotionQuery'
import { useQuery } from '@apollo/client'
import {Input, Header} from '../styles/styleComponents'
import CatgoriesProducts from '../components/home/catgoriesProducts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PromotionItem from "../components/promotion/promotionItem"

const AllPromotion = () => {
    const query = new URLSearchParams(useLocation().search)
    const initPage = Number(query.get("page")) || 1
    const { data, count } = useQuery(PROMOTIONS_QUERY)
    console.log(data)

    const destructPromotion = (acc, curr) => {
        if (curr.product){
            return {...acc, products: [...acc.products, curr.product]}
        }
        else if (curr.type === 'Coupon'){
            return {...acc, coupons: [...acc.coupons, curr]}
        }
        else
            return acc
    }

    const {coupons, products} = data?.promotions.reduce(destructPromotion, 
        {coupons: [], products: []}) || {coupons: [], products: []}

    return (
        <Container>      
            <Header>
                <h1>คูปองส่วนลด</h1>
            </Header>
            <PromoFlex>
                {coupons.map((item) => <PromotionItem key={item._id} promotion={item} />)}
            </PromoFlex>
            <CatgoriesProducts products={products} title={"สินค้าโปรโมชั่น"}/>  
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 4%;
`

const PromoFlex = styled.div`
    display: flex;
    max-height: 500px;
    overflow-y: scroll;
    justify-content: flex-start;
    margin-bottom: 50px;
    margin: 0 auto;
    flex-wrap: wrap;
    @media (max-width: 1800px){
        justify-content: center;
    }
`



export default AllPromotion;                    