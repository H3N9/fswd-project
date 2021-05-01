import { gql } from '@apollo/client'


export const SETPROMOTION_MUTATION = gql`
    mutation SetCoupon($record: [setPromotionInput!]){
        setPromotion(records: $record) {
            discountCoupons {
                couponPromotion{
                    method
                    type
                    discountValue
                    promotionCode
                }
            }
        }
    }
`