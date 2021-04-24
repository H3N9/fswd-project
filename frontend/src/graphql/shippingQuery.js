import { gql } from '@apollo/client'

export const SHIPPINGS = gql`
    query{
        shippings{
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
`