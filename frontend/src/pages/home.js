import React from 'react'
import styled from 'styled-components'
import {Box9p, SpaceBox} from '../styles/styleComponents'
import CatgoriesProducts from '../components/home/catgoriesProducts'
import { PRODUCT_QUERY } from '../graphql/productQuey'
import { useQuery } from '@apollo/client'



const Home = () => {
    const { loading, error, data } = useQuery(PRODUCT_QUERY)
    const products = data?.products || []
    console.log(products)

    return (
        <>
            <SpaceBox />
            <Box9p> 
                <MainImage>

                </MainImage>

                <CatgoriesProducts products={products} title={"All"}/>
                <CatgoriesProducts products={products} title={"Save Price"}/>
            </Box9p>
            <SpaceBox />
        </>
    )
}

const MainImage = styled.div`
    background-image: url('https://www.harveyawards.org/wp-content/uploads/2020/03/new-book.jpg');
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 500px;
    margin-bottom: 5vh;
    background-color: #f1f1f1;
`


export default Home