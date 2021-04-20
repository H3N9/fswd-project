import { gql } from '@apollo/client'


export const PRODUCT_MUTATION = gql`
    mutation CreateProduct($object: CreateOneProductInput!) {
        createProduct (record: $object) {
        recordId
        }
    }
`