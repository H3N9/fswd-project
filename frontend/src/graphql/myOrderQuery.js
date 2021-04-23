import {gql} from '@apollo/client'



export const MYORDER_QUERY = gql`
    query {
        myOrders {
        orderProducts {
            productId
            quantity
            product {
                _id
                title
                author
                publisher
                description
                price
                quantity
                types
                netPrice
                promotion {
                    _id
                    method
                }
            }
        }
        }
    }
`