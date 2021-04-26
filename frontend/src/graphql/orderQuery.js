import {gql} from '@apollo/client'



export const ORDER_QUERY = gql`
    query{
        orders{
            _id
        }
    }
`

export const ORDERS_PAGINATION_QUERY = gql`
    query OrdersWithPagination($object: FilterFindManyOrderInput!){
        ordersWithPagination(page: 1 perPage: 1 filter: $object){
            count
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