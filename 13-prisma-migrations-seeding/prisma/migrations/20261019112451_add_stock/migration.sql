/*
  Warnings:

  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
ALTER TABLE "Product"
ADD COLUMN "stock" INTEGER NOT NULL DEFAULT 0;