import { buildSchema } from 'graphql'

export default buildSchema(`
    type User {
        id: ID!
        name: String!
        password: String!
        email: String!
        address: String
        phoneNumber: String
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
        ownerId: User!
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
        users: [User!]!
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