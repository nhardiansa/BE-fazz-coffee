/*
  Warnings:

  - You are about to drop the column `name` on the `product_sizes` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `product_sizes` table. All the data in the column will be lost.
  - Added the required column `size_id` to the `product_sizes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "product_sizes_slug_key";

-- AlterTable
ALTER TABLE "product_sizes" DROP COLUMN "name",
DROP COLUMN "slug",
ADD COLUMN     "size_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "delivery_available_time_start" SET DATA TYPE TEXT,
ALTER COLUMN "delivery_available_time_end" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "sizes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sizes_name_key" ON "sizes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sizes_slug_key" ON "sizes"("slug");

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
