import { gql } from '@apollo/client'

export const COUPON_PAGINATION_QUERY = gql`
    query CouponPromotionsWithPagination($page: Int $perPage: Int){
        CouponPromotionsWithPagination(page: $page perPage: $perPage){
            items{
                _id
                promotionCode
                quantity
                description
                createdAt
                updatedAt
                method
                discountValue
                ... on Coupon{
                    orderQuantityCount
                }
            }
            pageInfo{
                currentPage
                hasNextPage
                hasPreviousPage
                perPage
                pageCount
                itemCount
            }
        }
    }
`

export const PROMOTIONS_QUERY = gql`
    query{
        promotions{
            _id
            type
            method
            description
            discountValue
            ... on Coupon{
                orderQuantityCount
                promotionCode
                quantity
            }
            ... on DiscountPrice{
                productId
                product{
                    _id
                    title
                    author
                    publisher
                    description
                    price
                    quantity
                    types
                    netPrice
                    image
                    promotion {
                        _id
                        method
                    }
                }
            }
        }
    }
`

export const PROMOTIONS_PAGINATION_QUERY = gql`
    query PromotionsWithPagination($page: Int $perPage: Int){
        promotionsWithPagination(page: $page perPage: $perPage){
            items{
                _id
                type
                method
                description
                discountValue
                createdAtWithFormatDateTime
                updatedAtWithFormatDateTime
                ... on Coupon{
                    orderQuantityCount
                    promotionCode
                    quantity
                }
                ... on DiscountPrice{
                    productId
                    product{
                        _id
                        title
                    }
                }
            }
            pageInfo{
                currentPage
                hasNextPage
                hasPreviousPage
                perPage
                pageCount
                itemCount
            }
        }
    }
`