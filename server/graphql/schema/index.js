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

   
    input ProductInput {
        title: String!
        description: String
        price: Int
        rentPrice: Int
        rentDuration: String
    }

    type Product {
        id: ID!
        title: String!
        description: String
        price: Int
        rentPrice: Int
        rentDuration: String
        created_at: String!
        owner: User!
        categories: [Category] 
    }

    type Category {
        id: ID!
        title: String
        created_at: String!
    }

    type RootQuery {
        products: [Product!]!
        users: [User!]!
    }

    type RootMutation {
        createProduct(productInput: ProductInput): Product
        addCategory(productId: Int, categoryId: Int): Product
        createUser(userInput: UserInput): User
        deleteProduct(productId: Int): Product
        
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)