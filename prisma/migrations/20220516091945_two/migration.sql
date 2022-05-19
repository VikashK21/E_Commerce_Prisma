/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Seller" ALTER COLUMN "phone_number" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Seller_phone_number_key" ON "Seller"("phone_number");
