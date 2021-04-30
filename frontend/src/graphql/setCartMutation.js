import { gql } from '@apollo/client'


export const SETCART_MUTATION = gql`
    mutation SetCart($object: [editCartInput!]){
        setCart (records: $object) {
            _id
            status
            orderProducts{
                _id
                product{
                    _id
                    title
                    price
                    netPrice
                    quantity
                }
                quantity
            }
            discounts{
                promotionId
                type
                discount
                description
            }
            totalPrice
            netTotalPrice
            createdAtWithFormatDateTime
            updatedAtWithFormatDateTime
            shipping{
                address
                phoneNumber
            }
        }
    }
`