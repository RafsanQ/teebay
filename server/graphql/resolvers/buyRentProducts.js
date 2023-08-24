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
    }
}