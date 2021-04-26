import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PRODUCT_PAGINATION_QUERY } from '../graphql/productPaginationQuery'
import { useQuery } from '@apollo/client'
import Card from '../components/home/card'
import Pagination from "../components/pagination"
import {Input} from '../styles/styleComponents'

const AllProducts = () => {
    const query = new URLSearchParams(useLocation().search)
    const initPage = Number(query.get("page")) || 1
    const [ queryPage, setQueryPage ] = useState(initPage)
    const [ filter, setFilter ] = useState({
        name: "",
        sortBy: "",
        date: "",
        types: "",
    })
    const { data, count } = useQuery(PRODUCT_PAGINATION_QUERY, {variables: {pageNum:queryPage, perPageNum: 5}, fetchPolicy: 'network-only'})
    const pageData = data?.productsWithPagination.pageInfo || {}
    const products = data?.productsWithPagination.items || []

    const inputHandle = (event) =>{
        const {name, value} = event.target
        setFilter({
            ...filter,
            [name]: value
        })
        console.log(filter)
    }

    return (
        <Container>      
            <h1>สินค้าทั้งหมด</h1>
            <SearchBar>
                <Input>
                    <input type="text" name="name" id="name" placeholder="ค้นหาชื่อหนังสือ" value={filter.name}  onChange={(e) => inputHandle(e)}/>
                </Input>
                <Input>
                    <select type="text" name="types" id="types" value={filter.types}  onChange={(e) => inputHandle(e)}>
                        <option value="Normal">Normal</option>
                        <option value="Dramas">Dramas</option>
                        <option value="Cosmoslogy">Cosmoslogy</option>
                    </select>
                </Input>
                <Input>
                    <select type="text" name="sortBy" id="sortBy" value={filter.sortBy} onChange={(e) => inputHandle(e)} >
                        <option value="highest">ราคาต่ำสุด</option>
                        <option value="lowest">ราคาสูงสุด</option>
                    </select>
                </Input>
                <Input>
                    <select type="text" name="date" id="date" value={filter.date} onChange={(e) => inputHandle(e)} >
                        <option value="latest">ล่าสุด</option>
                        <option value="Oldest">เก่าสุด</option>
                    </select>
                </Input>
            </SearchBar>
            <Flex>
                {products?.map((product, index) => (<Card key={index} product={product} />))} 
            </Flex>
            <Pagination setQueryPage={setQueryPage} queryPage={queryPage} pageData={pageData}/>       
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
    margin-bottom: 50px;

`

const SearchBar = styled.div`
    width: 100%;
    position: sticky;
    top: 7%;
    z-index: 10;
    padding: 5px 0;
    background: #FFF;
    display: flex;
    align-items: center;
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    div{
        width: fit-content;
        padding: 0 10px;
        input{
            width: 20vw;
            @media (max-width: 510px){
                width: 100px;
            }
        }
        select{
            @media (max-width: 510px){
                width: 100px;
            }
        }

    }

`


export default AllProducts;                    