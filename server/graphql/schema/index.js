import { buildSchema } from 'graphql'

export default buildSchema(`
    scalar ISODate

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

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
        userId: Int
    }

    input ProductUpdateInput {
        id: ID!
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
        created_at: ISODate!
        owner: User
        categories: [Category] 
    }

    type Category {
        id: ID!
        title: String
        created_at: ISODate
    }

    type RootQuery {
        products: [Product!]!
        getSingleProduct (productId: Int): Product!
        productsOwnedBy (ownerId: Int): [Product!]
        getAllProductCategories: [Category!]!
        users: [User!]!
        loginUser (email: String, password: String): AuthData! 
    }

    type RootMutation {
        createProduct(productInput: ProductInput): Product
        addCategory(productId: Int, categoryId: Int): Product!
        removeCategory(productId: Int, categoryId: Int): Product
        clearAllCategories(productId: Int): Product
        updateProduct(productUpdateInput: ProductUpdateInput): Product
        deleteProduct(productId: Int): Product
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)