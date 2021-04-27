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
            image
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
            image
            promotion {
                _id
                method
            }
        }
    }
`

export const PRODUCT_FIND_ONE = gql`
    query Product($object: FilterFindOneProductInput!){
        product(filter: $object){
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
`

export const PRODUCT_QUERY_QUANTITY = gql`
    query Products($object: FilterFindManyProductInput){
        products(filter: $object){
            _id
            quantity
        }
    }
`