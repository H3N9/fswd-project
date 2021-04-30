import { gql } from '@apollo/client'


export const CREATE_PRODUCT = gql`
    mutation CreateProduct($object: CreateOneProductInput!) {
        createProduct (record: $object) {
        recordId
        }
    }
`

export const UPDATE_PRODUCT = gql`
    mutation UpdateProductById($object: UpdateByIdProductInput! $id: MongoID!){
        updateProductById(_id: $id record: $object){
        recordId
        }
    }
`

export const DELETE_PRODUCT = gql`
    mutation RemoveProduct($id: MongoID!){
        removeProduct(_id: $id){
            recordId
        }
    }
`
