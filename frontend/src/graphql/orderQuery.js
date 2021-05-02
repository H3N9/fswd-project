import {gql} from '@apollo/client'



export const ORDER_QUERY = gql`
    query{
        orders{
            _id
        }
    }
`

export const ORDERS_PAGINATION_QUERY = gql`
    query OrdersWithPagination($page: Int $perPage: Int 
        $object: FilterFindManyOrderInput! $sort: SortFindManyOrderInput){
        ordersWithPagination(page: $page perPage: $perPage
            filter: $object sort: $sort
            ){
            count
            items{
                _id
                status
                user{
                    username
                    name
                }
                netTotalPrice
                updatedAtWithFormatDateTime
            }
        }
    }
`

export const ORDERS_COUNT_QUERY = gql`
    query{
        ordersCount{
            processingCount
            completeCount
            shippedCount
            closedCount
        }
    }
`

export const ORDER_QUERY_BY_ID = gql`
    query Order($id: MongoID!){
        order(_id: $id){
        _id
        status
        createdAtWithFormatDateTime
        updatedAtWithFormatDateTime
        imagePayment
        user{
            _id
            username
            name
        }
        orderProducts{
            product{
            title
            price
            netPrice
            }
            quantity
        }
        shipping{
            address
            subDistrict
            district
            province
            postalCode
            phoneNumber
        }
        totalPrice
        discounts{
            promotionId
            type
            description
            discount
        }
        netTotalPrice
        }
    }
`