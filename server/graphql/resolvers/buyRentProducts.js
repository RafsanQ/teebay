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

    buyProduct: async (args) => {
        const { productId, userId } = args;
        try{
            let updatedProduct = await prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    isBought: true,
                    buyerId: userId
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
            updatedProduct = flatenProductCategories(updatedProduct);
            return updatedProduct;
        }catch(error){
            console.log(error);
            throw error;
        }
    },

    rentOut: async (args) => {
        const productId = args.productId;
        const userId = parseInt(args.userId);
        const startDate = args.startDate;
        const endDate = args.endDate;
        try{
            let updatedProduct = await prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    isRentedOut: true,
                    rentOutRecord: {
                        create: {
                            renterId: userId,
                            rentedOn: new Date(startDate),
                            rentEnds: new Date(endDate)
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
            })
            
            updatedProduct = flatenProductCategories(updatedProduct);
            return updatedProduct;
        }catch(error){
            console.log(error);
            throw error;
        }
    },

    finishRentOut: async (args) => {
        const productId = args.productId;
        try{
            await prisma.rentOut.delete({
                where: { productId: productId}
            })

            let updatedProduct = await prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    isRentedOut: false
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
            
            updatedProduct = flatenProductCategories(updatedProduct);
            return updatedProduct;
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    getBoughtProducts: async (args) => {
        const userId = args.userId;
        try{
            let products = await prisma.product.findMany({
                where: {
                    buyerId: userId
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

            products.forEach(product => {
                product = flatenProductCategories(product);
            });

            return products;
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    
    getSoldProducts: async (args) => {
        const userId = args.userId;
        try{
            let products = await prisma.product.findMany({
                where: {
                    ownerId: userId,
                    isBought: true
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

            products.forEach(product => {
                product = flatenProductCategories(product);
            });

            return products;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}