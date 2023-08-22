import { gql } from '@apollo/client';

export const GET_AUTH = gql`
query getAuth($email: String!, $password: String!){
    loginUser(email: $email, password: $password){
    userId,
    token,
    tokenExpiration
  }
}
`