/*
  Warnings:

  - A unique constraint covering the columns `[forumId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[forumId]` on the table `UserForum` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Post_forumId_unique` ON `Post`(`forumId`);

-- CreateIndex
CREATE UNIQUE INDEX `UserForum_forumId_unique` ON `UserForum`(`forumId`);
