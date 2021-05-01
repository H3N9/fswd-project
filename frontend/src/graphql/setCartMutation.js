import { gql } from '@apollo/client'


export const SETCART_MUTATION = gql`
    mutation SetCart($object: [editCartInput!]){
        setCart (records: $object) {
            _id
        }
    }
`