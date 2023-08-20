import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    products: async () => {
        try{
            let products = await prisma.product.findMany({
                include: {
                    owner: true,
                    categories: {
                        include: {
                            category: true
                        }
                    }
                    
                }
            });

            // Because the required category information is nested, we flatten it and remove the redundant junction table values.
            products.forEach(product => {
                product.categories.forEach(thisElement => {
                    thisElement.id = thisElement.category.id;
                    thisElement.title = thisElement.category.title;
                    delete thisElement.category;
                    delete thisElement.productId;
                    delete thisElement.categoryId;
                })
            });

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
            const product = await prisma.product.create({
                data: {
                    title: args.productInput.title,
                    description: args.productInput.description,
                    price: args.productInput.price,
                    rentPrice: args.productInput.rentPrice,
                    rentDuration: args.productInput.rentDuration,
                    created_at: new Date().toISOString(),
                    // ownerId: args.productInput.ownerId
                    ownerId: 2,
                    // categories: {
                    //     create: [
                    //         {
                    //             category: {
                    //                 id: 2
                    //             }
                    //         }
                    //     ]
                    // }
                }
              })
              console.log("Product created", product);
              return product;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    addCategory: async (args) => {
        const { productId, categoryId } = args
        try{
            const updatedProduct = await prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    categories: {
                        create: {
                            category: {
                                connect: {
                                    id: categoryId
                                },
                            }
                        }
                    }
                },
                include: {
                    categories: true
                }
            });
            console.log("Category added", updatedProduct);
            return updatedProduct;
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

  