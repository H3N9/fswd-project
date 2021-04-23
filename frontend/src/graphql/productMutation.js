import { gql } from '@apollo/client'


export const CREATE_PRODUCT = gql`
    mutation CreateProduct($object: CreateOneProductInput!) {
        createProduct (record: $object) {
        recordId
        }
    }
`