/*
  Warnings:

  - You are about to drop the column `userId` on the `auth` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `auth` DROP FOREIGN KEY `Auth_userId_fkey`;

-- AlterTable
ALTER TABLE `auth` DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `profile_image` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `first_name` VARCHAR(191) NULL,
    MODIFY `last_name` VARCHAR(191) NULL,
    MODIFY `display_name` VARCHAR(191) NULL,
    MODIFY `birthdate` VARCHAR(191) NULL,
    MODIFY `delivery_address` VARCHAR(191) NULL,
    MODIFY `phone_number` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Auth_userId_key` ON `auth`(`user_id`);

-- AddForeignKey
ALTER TABLE `auth` ADD CONSTRAINT `Auth_userId_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
