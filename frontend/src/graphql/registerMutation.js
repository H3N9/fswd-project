import {gql} from '@apollo/client'

export const REGISTER_MUTATION = gql`
    mutation Register($object: CreateOneUserInput!) {
        createUser (record: $object ) {
            recordId
        }
    }
`