import { gql } from '@apollo/client'


const login = gql`
    mutaion ($username: String! $password: String!){
        login (
            username: $username
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }

`