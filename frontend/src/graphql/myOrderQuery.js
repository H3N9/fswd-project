import {gql} from '@apollo/client'



export const MYORDER_QUERY = gql`
    query MyOrders($object: FilterFindManyOrderInput!){
        myOrders(filter: $object){
            _id
            status
            orderProducts {
                _id
                productId
                quantity
                product {
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
            updatedAtWithFormatDateTime
            totalPrice
            netTotalPrice
            discounts{
                promotionId
                type
                discount
                description
            }
        }
    }
`

export const MYORDER_QUERY_BY_ID = gql`
    query MyOrderById($id: MongoID!){
        myOrderById(_id: $id){
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
            shipping{
                address
                subDistrict
                district
                province
                postalCode
                phoneNumber
            }
            totalPrice
            netTotalPrice
            createdAtWithFormatDateTime
            updatedAtWithFormatDateTime
            shipping{
                address
                subDistrict
                district
                province
                postalCode
                phoneNumber
            }
        }
    }
`