import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Box9p, SpaceBox} from '../styles/styleComponents'
import {apiGateway} from '../tools/tools'
import CatgoriesBooks from '../components/catgoriesBooks'


const DiscountPage = () => {
    const [books, setBooks] = useState([])
    const url = "http://localhost:9000/books"

    useEffect(() => {
        apiGateway(url, setBooks)
    }, [])

    return (
        <>
            <SpaceBox />
            <Box9p> 
                <MainImage>

                </MainImage>

                <CatgoriesBooks books={books} title={"สินค้าลดราคา"}/>
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


export default DiscountPage