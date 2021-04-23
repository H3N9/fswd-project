import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_QUERY } from '../../graphql/productQuey'
import Card from '../../components/home/card'
import { useQuery } from '@apollo/client'
const Products = () => {
    const { loading, error, data } = useQuery(PRODUCT_QUERY)
    const products = data?.products || []
    return (
        <>         
            <Header>
                <h1>สินค้าทั้งหมด</h1>
                <Link to={`/createProduct`}><FontAwesomeIcon icon={['fas', 'plus']} /> เพิ่มสินค้า</Link>
            </Header>
            <Flex>
                {products?.map((product, index) => (<Card key={index} product={product} styled={{}}/>))} 
            </Flex>
        </>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 50px;
    h1{
        margin: 0;
        font-size: clamp(2rem, 5vmin, 2.5rem);
    }
    a{
        text-decoration:none;
        color: #FFF;
        background: #2fb12f;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 10px;
    }
`
const Flex = styled.div`
    display: flex;
    margin-top: 50px;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    margin: 0 auto;
    background: red;
`

export default Products;