import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Header, None} from '../../styles/styleComponents'
import {COUPON_PAGINATION_QUERY, PROMOTIONS_PAGINATION_QUERY} from '../../graphql/promotionQuery'
import { useQuery} from '@apollo/client'
import PromotionCard from '../../components/adminPromotion/promotionCard'
import Pagination from "../../components/pagination"


const Promotions = () => {
    const query = new URLSearchParams(useLocation().search)
    const initPage = Number(query.get("page")) || 1
    const [page, setPage] = useState(initPage)
    const perPage = 5
    //const {data} = useQuery(COUPON_PAGINATION_QUERY, {variables: {page:initPage, perPage}, fetchPolicy: 'network-only'})
    const {data, count} = useQuery(PROMOTIONS_PAGINATION_QUERY, {variables: {page:initPage, perPage}, fetchPolicy: 'network-only'})
    const promotions = data?.promotionsWithPagination?.items || []
    const pageData = data?.promotionsWithPagination?.pageInfo || {}
    const countPage = (page - 1)*perPage
    return (
        <Container>
            <Header>
                <h1>จัดการโปรโมชั่น{count}</h1>
                <Link to={`/admin/promotion/create`}><FontAwesomeIcon icon={['fas', 'plus']} /> เพิ่มโปรโมชั่น</Link>
            </Header>
            { 
                pageData.itemCount === 0 ? <None><h1>ไม่มีโปรโมชั่น</h1> </None>
                :
                null
            }
            <Flex>
               {promotions.map((promotion, index) => (<PromotionCard key={index} index={index} promotion={promotion} countPage={countPage} />))}
            </Flex>
            { 
                pageData.itemCount === 0 ? null 
                :
                <Pagination setQueryPage={setPage} queryPage={page} pageData={pageData}/>    
            }
            
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`

const Flex = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 30vmin;
`



export default Promotions;