import {gql} from '@apollo/client'



export const ORDER_QUERY = gql`
    query{
        orders{
            _id
        }
    }
`