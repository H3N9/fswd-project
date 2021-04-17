import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Box9p, SpaceBox} from '../styles/styleComponents'
import {apiGateway} from '../tools/tools'
import CatgoriesBooks from '../components/catgoriesBooks'
import { PRODUCT_QUERY } from '../graphql/productQuey'
import { useQuery } from '@apollo/client'



const Home = () => {
    const [books, setBooks] = useState([])
    const url = "http://localhost:9000/books"
    const { loading, error, data } = useQuery(PRODUCT_QUERY)
    console.log(data)

    return (
        <>
            <SpaceBox />
            <Box9p> 
                <MainImage>

                </MainImage>

                <CatgoriesBooks books={books} title={"สินค้าใหม่"}/>
                <CatgoriesBooks books={books} title={"สินค้าแนะนำ"}/>
            </Box9p>
            <SpaceBox />
        </>
    )
}

const MainImage = styled.div`
    width: 100%;
    height: 500px;
    margin-bottom: 5vh;
    background-color: #f1f1f1;
`


export default Home