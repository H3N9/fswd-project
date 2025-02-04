import React, {useState} from 'react'
import {Box9p, SpaceBox} from '../styles/styleComponents'
import CatgoriesProducts from '../components/home/catgoriesProducts'
import { PRODUCT_PAGINATION_QUERY } from '../graphql/productPaginationQuery'
import { DISCOUNT_PRODUCT_PROMOTION_QUERY } from '../graphql/promotionQuery'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Response from "../components/response"
import Loading from "../components/loading"

const Home = () => {
    const [isToCart, setIsToCart ] = useState(undefined)
    const { data, loading } = useQuery(PRODUCT_PAGINATION_QUERY, {variables: {pageNum:1, perPageNum: 20, sort: "QUANTITY_DESC"}, fetchPolicy: 'network-only'})
    const discountProduct = useQuery(DISCOUNT_PRODUCT_PROMOTION_QUERY, {fetchPolicy: 'network-only'})

    const products1 = data?.productsWithPagination?.items?.slice(0, 11) || []
    const products2 = discountProduct?.data?.DiscountPricePromotions.map((item) => item.product).slice(0, 11) || []

    return (
        <>
            <Response state={isToCart} setState={setIsToCart} />
           
            <SpaceBox />
            <Box9p> 
            <MainImage />
                { (loading && discountProduct.loading) ?
                    <Loading/>
                    :
                    <>
                        <CatgoriesProducts products={products2} title={"สินค้าโปรโมชั่น"} setIsToCart={setIsToCart}/>
                        <CatgoriesProducts products={products1} title={"สินค้าทั้งหมด"} setIsToCart={setIsToCart}/>
                    </>
                }
            </Box9p>
            <SpaceBox />
        </>
    )
}

const MainImage = styled.div`
    background-position: center center;
    width: 100%;
    height: 40vh;
    margin-bottom: 5vh;
    background-color: #f1f1f1;
    display: flex;
    justify-content: center;
    overflow: hidden;
    background-image: url("https://cdn.vox-cdn.com/thumbor/LQGFtqTzae6oCxmRF5IRkxZhXvM=/0x0:4368x2912/920x613/filters:focal(1835x1107:2533x1805):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66622080/shutterstock_117304297.0.jpg");
`

export default Home