import { gql } from "@apollo/client"

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($object: updateUserInput!){
        updateProfile(record: $object){
            _id
            username
            name
            isAdmin
        }
    }
`