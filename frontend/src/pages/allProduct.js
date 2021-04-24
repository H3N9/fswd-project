import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../graphql/productQuey'
import { useQuery } from '@apollo/client'
import {Header} from '../styles/styleComponents'
import Card from '../components/home/card'

const AllProducts = () => {
    const { data } = useQuery(PRODUCT_QUERY)
    const products = data?.products || []

    return (
        <Container>         
            <h1>สินค้าทั้งหมด</h1>
            <Flex>
                {products?.map((product, index) => (<Card key={index} product={product} />))} 
            </Flex>        
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 4%;
`

const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

`


export default AllProducts;                    