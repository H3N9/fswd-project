import { gql } from '@apollo/client'

export const PRODUCT_PAGINATION_QUERY = gql`
    query productsWithPagination($pageNum: Int $perPageNum: Int $sort: SortFindManyProductInput){
        productsWithPagination(page: $pageNum perPage: $perPageNum sort: $sort){
            count
            pageInfo{
                currentPage
                hasNextPage
                hasPreviousPage
                perPage
                pageCount
                itemCount
            }
            items{
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
                orderQuantityCount
            }
        }
    }
`