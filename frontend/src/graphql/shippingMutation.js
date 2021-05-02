import { gql } from '@apollo/client'

export const CREATE_SHIPPING = gql`
    mutation CreateShipping($object: CreateOneShippingInput!){
        createShipping(record: $object){
            record{
                _id
                address
                phoneNumber
                subDistrict
                district
                province
                phoneNumber
                postalCode
                province
            }
        }
    }
`

export const UPDATE_SHIPPING = gql`
    mutation UpdateShippingById($id: MongoID! $object: UpdateByIdShippingInput!){
        updateShippingById(_id: $id record: $object){
            record{
                _id
                address
                phoneNumber
                subDistrict
                district
                province
                phoneNumber
                postalCode
                province
            }
        }
    }
`

export const SET_SHIPPING = gql`
    mutation SetShipping($shippingId: String!){
        setShipping(shippingId: $shippingId){
            _id
            shipping{
                _id
                address
                postalCode
                phoneNumber
            }
        }
    }
`