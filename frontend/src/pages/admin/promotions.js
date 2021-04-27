import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Header} from '../../styles/styleComponents'
import {COUPON_PAGINATION_QUERY} from '../../graphql/promotionQuery'
import { useQuery} from '@apollo/client'
import PromotionCard from '../../components/adminPromotion/promotionCard'
import Pagination from "../../components/pagination"


const Promotions = () => {
    const query = new URLSearchParams(useLocation().search)
    const initPage = Number(query.get("page")) || 1
    const [page, setPage] = useState(initPage)
    const perPage = 5
    const {data} = useQuery(COUPON_PAGINATION_QUERY, {variables:{page:initPage, perPage}, fetchPolicy: 'network-only'})
    const promotions = data?.CouponPromotionsWithPagination?.items || []
    const pageData = data?.CouponPromotionsWithPagination?.pageInfo || {}
    const countPage = (page - 1)*perPage
    

    return (
        <Container>
            <Header>
                <h1>จัดการโปรโมชั่น</h1>
                <Link to={`/admin/promotion/create`}><FontAwesomeIcon icon={['fas', 'plus']} /> เพิ่มโปรโมชั่น</Link>
            </Header>
            <Flex>
               {promotions.map((promotion, index) => (<PromotionCard key={index} index={index} promotion={promotion} countPage={countPage} />))}
            </Flex>
            <Pagination setQueryPage={setPage} queryPage={page} pageData={pageData}/>    
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`

const Flex = styled.div`
    width: 100%;
    display: flex;
    margin-top: 50px;
    justify-content: center;
    flex-direction: column;
    align-items: center;

`



export default Promotions;