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

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
      type RootQuery {
        products: [String!]!

      }

      type RootMutation {
        createProduct(name: String): String
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
  `),
  rootValue: {
    products: () => {
      return ['random', 'String', 'Example 1', 'Product example 2'];
    },
    createProduct: (args) => {
      const productName = args.name;
      return productName;
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
