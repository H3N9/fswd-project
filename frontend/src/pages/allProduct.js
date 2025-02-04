import React, {useState} from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { PRODUCT_PAGINATION_QUERY } from '../graphql/productPaginationQuery'
import { useQuery } from '@apollo/client'
import Card from '../components/home/card'
import Pagination from "../components/pagination"
import {Input, Header, None} from '../styles/styleComponents'
import Loading from '../components/loading'
import Response from '../components/response'
const AllProducts = () => {
    const [isToCart, setIsToCart ] = useState(undefined)
    const query = new URLSearchParams(useLocation().search)
    const initPage = Number(query.get("page")) || 1
    const [ queryPage, setQueryPage ] = useState(initPage)
    const [ filter, setFilter ] = useState({
        name: "",
        sortBy: "",
        date: "",
        types: "",
    })
    const { data, count, loading } = useQuery(PRODUCT_PAGINATION_QUERY, {variables: {pageNum:queryPage, perPageNum: 8, sort: "QUANTITY_DESC"}, fetchPolicy: 'network-only'})
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
           <Header>
            <h1>สินค้าทั้งหมด</h1>
           </Header>
           <Response state={isToCart} setState={setIsToCart}/>
            {/* <SearchBar>
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
            </SearchBar> */}
            
            { 
                pageData.itemCount === 0 ? <None><h1>ไม่มีสินค้า</h1> </None> 
                :
                null
            }
            <Flex>
                {products?.map((product, index) => (<Card key={index} product={product} setIsToCart={setIsToCart} />))} 
            </Flex>
            { loading ? <Loading/> 
                :  pageData.itemCount === 0 ? null 
                : <Pagination setQueryPage={setQueryPage} queryPage={queryPage} pageData={pageData}/>
            }
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 4% 30px 4%;
`

const Flex = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(270px, 1fr) );
    justify-items: center;
    
    justify-content: center;
    margin-bottom: 50px;
    @media (max-width: 415px){
        display: flex;
        flex-wrap: wrap;
    }
`

const SearchBar = styled.div`
    width: 100%;
    position: sticky;
    top: 7%;
    z-index: 10;
    padding: 5px 0;
    display: flex;
    align-items: center;
    background: #f6f6f6;
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    div{
        width: fit-content;
        padding: 0 10px;
        input{
            background: transparent;
            width: 20vw;
            @media (max-width: 510px){
                width: 100px;
            }
        }
        select{
            background: transparent;
            @media (max-width: 510px){
                width: 100px;
            }
        }

    }

`


export default AllProducts;                    