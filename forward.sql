-- DropForeignKey
ALTER TABLE `verify_reset_tokens` DROP FOREIGN KEY `verify_reset_tokens_user_id_fkey`;

-- AlterTable
ALTER TABLE `verify_reset_tokens` MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `verify_reset_tokens` ADD CONSTRAINT `verify_reset_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

