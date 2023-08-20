import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default {
    products: async () => {
        const products = await prisma.product.findMany()
        return products;
    },
    createProduct: (args) => {
      const prodcut = {
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