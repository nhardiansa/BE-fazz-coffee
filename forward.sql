-- AlterTable
ALTER TABLE `auths` ADD COLUMN `is_verified` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `role` ENUM('ADMIN', 'CUSTOMER') NULL DEFAULT 'CUSTOMER';

