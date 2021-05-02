import {gql} from "@apollo/client"

export const ME_QUERY = gql`
    query {
        me {
            name
            _id
            isAdmin
        }
    }

`

export const MY_PROFILE = gql`
    query{
        me{
            _id
            username
            name
            isAdmin
        }
    }
`