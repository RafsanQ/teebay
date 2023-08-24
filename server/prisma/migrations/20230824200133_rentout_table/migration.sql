-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isRentedOut" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "RentOut" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "renterId" INTEGER NOT NULL,
    "rentedOn" DATE NOT NULL,
    "rentEnds" DATE NOT NULL,

    CONSTRAINT "RentOut_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RentOut_productId_key" ON "RentOut"("productId");

-- AddForeignKey
ALTER TABLE "RentOut" ADD CONSTRAINT "RentOut_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentOut" ADD CONSTRAINT "RentOut_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
