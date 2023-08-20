-- DropForeignKey
ALTER TABLE "CatagoriesOnProduct" DROP CONSTRAINT "CatagoriesOnProduct_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CatagoriesOnProduct" DROP CONSTRAINT "CatagoriesOnProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "CatagoriesOnProduct" ADD CONSTRAINT "CatagoriesOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatagoriesOnProduct" ADD CONSTRAINT "CatagoriesOnProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Catagory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
