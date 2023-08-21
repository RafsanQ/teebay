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

    getSingleProduct: async (args) => {
        try{
            console.log(args.productId);
            const product = await prisma.product.findUnique({
                where: {
                    id: args.productId
                },
                include: {
                    owner: true,
                    categories: {
                        include: {
                            category: true
                        }
                    }
                }
            })

             // Because the required category information is nested, we flatten it and remove the redundant junction table values.
            product.categories.forEach(thisElement => {
                thisElement.id = thisElement.category.id;
                thisElement.title = thisElement.category.title;
                delete thisElement.category;
                delete thisElement.productId;
                delete thisElement.categoryId;
            })

            return product;
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

    createProduct: async (args, req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }
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

                },
                include: {
                    owner: true
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
                    owner: true,
                    categories: {
                        include: {
                            category: true
                        }
                    }
                }
            });

            // Because the required category information is nested, we flatten it and remove the redundant junction table values.
            updatedProduct.categories.forEach(thisElement => {
                thisElement.id = thisElement.category.id;
                thisElement.title = thisElement.category.title;
                delete thisElement.category;
                delete thisElement.productId;
                delete thisElement.categoryId;
            })

            // console.log(JSON.stringify(updatedProduct, null, 4));
            return updatedProduct;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    updateProduct: async (args) => {
        try{
            const product = await prisma.product.update({
                where: {
                    id: args.productId
                },
                data: {
                    title: args.productInput.title,
                    description: args.productInput.description,
                    price: args.productInput.price,
                    rentPrice: args.productInput.rentPrice,
                    rentDuration: args.productInput.rentDuration,
                    created_at: new Date().toISOString(),
                    // ownerId: args.productInput.ownerId
                    ownerId: 2,
                }
              })
              console.log("Product updated", product);
              return product;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    deleteProduct: async (args) => {
        try{
            const deletedProduct = await prisma.product.delete({
                where: {
                    id: args.productId
                },
                include: {
                    owner: true,
                }
            })
            return deletedProduct;
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}