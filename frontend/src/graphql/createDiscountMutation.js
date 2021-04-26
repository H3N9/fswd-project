import { gql } from '@apollo/client'


export const CREATEDISCOUNT_MUTATION = gql`
    mutation CreateDiscount($record: CreateOneDiscountPriceInput!){
        createDiscountPricePromotion (record: $record){
            recordId
        }
    }

`