/*
  Warnings:

  - Added the required column `like` to the `UserLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserLike` ADD COLUMN `like` INTEGER NOT NULL;
