import { buildSchema } from 'graphql'

export default buildSchema(`
    type User {
        id: ID!
        name: String!
        password: String!
        email: String!
        address: String
        phone: String
    }

    input UserInput {
        name: String!
        password: String!
        email: String!
        address: String
        phone: String
    }

    type Product {
        id: ID!
        title: String!
        description: String
        price: Int
        rentPrice: Int
        rentDuration: String
        created_at: String!
    }

    input ProductInput {
        title: String!
        description: String
        price: Int
        rentPrice: Int
        rentDuration: String
    }

    type RootQuery {
        products: [Product!]!
    }

    type RootMutation {
        createProduct(productInput: ProductInput): Product
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)