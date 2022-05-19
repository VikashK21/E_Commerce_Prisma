/*
  Warnings:

  - Added the required column `password` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "password" VARCHAR(16) NOT NULL;
