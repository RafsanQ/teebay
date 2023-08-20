import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default {
    products: async () => {
        try{
            const products = await prisma.product.findMany();
            return products;
        }catch(error){
            console.error(error);
            throw error;
        }
        
    },

    users: async () => {
        try{
            const users = await prisma.user.findMany();
            return users;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    createProduct: async (args) => {
        try{
            const prodcut = await prisma.product.create({
                data: {
                    title: args.productInput.title,
                    description: args.productInput.description,
                    price: args.productInput.price,
                    rentPrice: args.productInput.rentPrice,
                    rentDuration: args.productInput.rentDuration,
                    created_at: new Date().toISOString(),
                    // ownerId: args.productInput.ownerId
                    ownerId: 2
                }
              })
              console.log("Product created", prodcut);
              return prodcut;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    createUser: async (args) => {
        try{
            const user = await prisma.user.create({
                data: {
                   name: args.userInput.name,
                   password: args.userInput.password,
                   email: args.userInput.email,
                   address: args.userInput.address,
                   phoneNumber: args.userInput.phone
                }
            })
            console.log("added user!", user);
            return user;
        }catch(error){
            console.error(error);
            throw error;
        }
    }
  }

  