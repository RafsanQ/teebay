import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function flatenProductCategories(product){
    product.categories.forEach(thisElement => {
        thisElement.id = thisElement.category.id;
        thisElement.title = thisElement.category.title;
        delete thisElement.category;
        delete thisElement.productId;
        delete thisElement.categoryId;
    });
    return product;
}

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
                product = flatenProductCategories(product);
            });

            return products;
        }catch(error){
            console.error(error);
            throw error;
        }
        
    },

    productsOwnedBy : async (args) => {
        try{
            const products = await prisma.product.findMany({
                where: {
                    ownerId: args.ownerId
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
            products.forEach(product => {
                product = flatenProductCategories(product);
            });

            return products;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    getSingleProduct: async (args) => {
        try{
            let product = await prisma.product.findUnique({
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
            product = flatenProductCategories(product);
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
              return product;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    addCategory: async (args) => {
        const { productId, categoryId } = args
        try{
            let updatedProduct = await prisma.product.update({
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
            updatedProduct = flatenProductCategories(updatedProduct);
            return updatedProduct;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    removeCategory: async (args) => {
        const { productId, categoryId } = args;
        try{
            await prisma.CatagoriesOnProduct.deleteMany({
                where: {productId: productId, categoryId: categoryId}
            })

            let updatedProduct = await prisma.product.findUnique({
                where: {
                    id: productId
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
            updatedProduct = flatenProductCategories(updatedProduct);
            return updatedProduct;
            
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    updateProduct: async (args) => {
        try{
            let updatedProduct = await prisma.product.update({
                where: {
                    id: parseInt(args.productUpdateInput.id)
                },
                data: {
                    title: args.productUpdateInput.title,
                    description: args.productUpdateInput.description,
                    price: args.productUpdateInput.price,
                    rentPrice: args.productUpdateInput.rentPrice,
                    rentDuration: args.productUpdateInput.rentDuration,
                    created_at: new Date().toISOString(),
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
            updatedProduct = flatenProductCategories(updatedProduct);

            return updatedProduct;
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