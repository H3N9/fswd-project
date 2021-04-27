import { gql } from '@apollo/client'

export const ORDER_UPDATE_STATUS = gql`
    mutation UpdateOrder($id: MongoID! $object: UpdateByIdOrderInput!){
        updateOrder(_id: $id record: $object ){
            record{
                _id
                status
                createdAtWithFormatDateTime
                updatedAtWithFormatDateTime
                user{
                    _id
                    username
                    name
                }
                totalPrice
                netTotalPrice
            }
        }
    }
`