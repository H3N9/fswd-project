import { gql } from '@apollo/client'

export const UPDATE_COUPON_BY_ID = gql`
    mutation UpdateCouponById($id: MongoID! $object: UpdateByIdCouponInput!){
        updateCouponById(_id: $id record: $object){
            record{
                _id
                type
                method
                discountValue
                promotionCode
                quantity
                description
            }
        }
    }
`