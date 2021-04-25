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

export const MY_SHIPPINGS = gql`
    query{
        myShippings{
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