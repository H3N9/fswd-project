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
import Loading from "../components/loading" 

const AllPromotion = () => {
    const query = new URLSearchParams(useLocation().search)
    const initPage = Number(query.get("page")) || 1
    const { data, count, loading } = useQuery(PROMOTIONS_QUERY, {fetchPolicy: 'network-only'})

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
            {loading ? 
                <Loading />
                :
                <>
                    <PromoFlex>
                        {coupons.map((item) => (
                            <div className="item-wrapper">
                                <PromotionItem key={item._id} promotion={item} />
                            </div>
                         ))}
                    </PromoFlex>
                    <CatgoriesProducts products={products} title={"สินค้าโปรโมชั่น"}/>  
                </>
            }

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