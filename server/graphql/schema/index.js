const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)