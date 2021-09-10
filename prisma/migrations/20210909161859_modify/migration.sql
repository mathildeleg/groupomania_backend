/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commenterId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[creatorId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserForum` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[likerId]` on the table `UserLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Administrator_userId_unique` ON `Administrator`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Comment_commenterId_unique` ON `Comment`(`commenterId`);

-- CreateIndex
CREATE UNIQUE INDEX `Post_creatorId_unique` ON `Post`(`creatorId`);

-- CreateIndex
CREATE UNIQUE INDEX `UserForum_userId_unique` ON `UserForum`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `UserLike_likerId_unique` ON `UserLike`(`likerId`);
