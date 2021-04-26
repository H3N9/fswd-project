import { gql } from '@apollo/client'

export const COUPON_PAGINATION_QUERY = gql`
    query CouponPromotionsWithPagination($page: Int $perPage: Int){
        CouponPromotionsWithPagination(page: $page perPage: $perPage){
            items{
                _id
                quantity
            }
        }
    }
`