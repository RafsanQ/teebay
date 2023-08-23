import { ApolloClient, HttpLink, gql } from '@apollo/client';
import { cache } from '../cache';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const client = new ApolloClient({
    cache: cache,
    headers: {
      authorization: localStorage.getItem("token") || "",
    },
    link: new HttpLink({
        uri: 'http://localhost:3001/graphql'
    }),
    typeDefs
});
