/*
  Warnings:

  - Added the required column `avatar` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserProfile` ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
