import { gql } from '@apollo/client'

export const PRODUCT_QUERY = gql`
    query {
        products {
            _id
            name
            description
            price
            quantity
        }
    }

`