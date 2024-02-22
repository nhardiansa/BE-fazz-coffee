/*
  Warnings:

  - You are about to drop the column `delivery_method` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "delivery_method";

-- DropEnum
DROP TYPE "DeliveryMethod";

-- CreateTable
CREATE TABLE "product_delivery_methods" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "delivery_method_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "product_delivery_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_methods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "delivery_methods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_methods_name_key" ON "delivery_methods"("name");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_methods_slug_key" ON "delivery_methods"("slug");

-- AddForeignKey
ALTER TABLE "product_delivery_methods" ADD CONSTRAINT "product_delivery_methods_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_delivery_methods" ADD CONSTRAINT "product_delivery_methods_delivery_method_id_fkey" FOREIGN KEY ("delivery_method_id") REFERENCES "delivery_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
