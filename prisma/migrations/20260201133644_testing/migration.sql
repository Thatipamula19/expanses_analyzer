/*
  Warnings:

  - You are about to drop the column `amount` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "amount";
