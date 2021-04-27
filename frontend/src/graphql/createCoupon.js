import {gql} from '@apollo/client'


export const CREATECOUPON_MUTATION = gql`
    mutation CreateCoupon($record: CreateOneCouponInput!){
        createCouponPromotion(record: $record){
            recordId
        }
    }
`