import { gql } from '@apollo/client'


export const CREATEDISCOUNT_MUTATION = gql`
    mutation CreateDiscount($record: CreateOneDiscountPriceInput!){
        createDiscountPricePromotion (record: $record){
            recordId
        }
    }

`

export const UPDATEPROMOTION_MUTATION = gql`
    mutation UpdatePromotion($id: MongoID! $record: UpdateByIdPromotionInput!){
        updatePromotion(_id: $id record: $record){
        recordId
        }
    }
`