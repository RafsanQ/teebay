-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "buyerId" INTEGER,
ADD COLUMN     "isBought" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
