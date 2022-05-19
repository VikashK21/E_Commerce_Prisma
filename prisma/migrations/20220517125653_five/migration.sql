/*
  Warnings:

  - You are about to alter the column `email` on the `Seller` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `phone_number` on the `Seller` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Seller" ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(20);
