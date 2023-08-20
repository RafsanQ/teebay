
const products = [];

module.exports = {
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
  }