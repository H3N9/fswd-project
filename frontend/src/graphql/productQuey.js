import { gql } from '@apollo/client'

export const PRODUCT_QUERY = gql`
    query {
        products {
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

`

export const PRODUCT_BY_ID = gql`
    query Product($id: MongoID!) {
        productById(_id: $id) {
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
`