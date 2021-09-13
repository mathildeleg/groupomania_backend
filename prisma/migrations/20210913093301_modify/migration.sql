/*
  Warnings:

  - You are about to drop the column `image_path` on the `ContentImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `UserLike` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imagePath` to the `ContentImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ContentImage` DROP COLUMN `image_path`,
    ADD COLUMN `imagePath` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Comment_postId_unique` ON `Comment`(`postId`);

-- CreateIndex
CREATE UNIQUE INDEX `UserLike_postId_unique` ON `UserLike`(`postId`);
