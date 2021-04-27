import React, { useEffect, useRef, useState } from 'react'
import {Box9p, SpaceBox} from '../styles/styleComponents'
import CatgoriesProducts from '../components/home/catgoriesProducts'
import { PRODUCT_QUERY } from '../graphql/productQuey'
import { useQuery } from '@apollo/client'
import SlideShow from '../components/home/slideShow'



const Home = () => {
    const { data } = useQuery(PRODUCT_QUERY, {fetchPolicy: 'network-only'})
    const products = data?.products || []

    return (
        <>
            <SpaceBox />
            <Box9p> 
                <SlideShow />
                <CatgoriesProducts products={products} title={"สินค้าทั้งหมด"}/>
                <CatgoriesProducts products={products} title={"สินค้าโปรโมชั่น"}/>
            </Box9p>
            <SpaceBox />
        </>
    )
}


export default Home