const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

const products = [];

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
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
  `),
  rootValue: {
    products: () => {
      return products;
    },
    createProduct: (args) => {
      const prodcut = {
        id: Math.random().toString(),
        title: args.productInput.title,
        description: args.productInput.description,
        price: args.productInput.price,
        rentPrice: args.productInput.rentPrice,
        rentDuration: args.productInput.rentDuration,
        created_at: new Date().toISOString()
      }
      products.push(prodcut);
      return prodcut;
    }
  },
  graphiql: true
}) )

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
