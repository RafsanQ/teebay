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

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const CREATE_NEW_USER = gql`
mutation createNewUser($name: String!, $address: String!, $email: String!, $phoneNumber: String!, $password: String!){
    createUser(userInput: {name: $name, address: $address, email: $email, phone: $phoneNumber, password: $password}){
        id
    } 
}
`