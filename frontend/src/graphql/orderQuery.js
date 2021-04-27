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