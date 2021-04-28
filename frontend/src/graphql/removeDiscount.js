import {gql} from '@apollo/client'


export const REMOVEDISCOUNT_MUTATION = gql`
    mutation RemovePromotion($id: MongoID!){
        removeDiscountPriceById(_id: $id){
        recordId
        }
    }
`