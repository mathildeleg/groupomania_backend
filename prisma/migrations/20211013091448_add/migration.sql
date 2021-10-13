-- DropForeignKey
ALTER TABLE `Administrator` DROP FOREIGN KEY `Administrator_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_commenterId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `ContentImage` DROP FOREIGN KEY `ContentImage_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `ContentUrl` DROP FOREIGN KEY `ContentUrl_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_forumId_fkey`;

-- DropForeignKey
ALTER TABLE `UserForum` DROP FOREIGN KEY `UserForum_forumId_fkey`;

-- DropForeignKey
ALTER TABLE `UserLike` DROP FOREIGN KEY `UserLike_likerId_fkey`;

-- DropForeignKey
ALTER TABLE `UserLike` DROP FOREIGN KEY `UserLike_postId_fkey`;

-- AddForeignKey
ALTER TABLE `Administrator` ADD CONSTRAINT `Administrator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserForum` ADD CONSTRAINT `UserForum_forumId_fkey` FOREIGN KEY (`forumId`) REFERENCES `Forum`(`forumId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_forumId_fkey` FOREIGN KEY (`forumId`) REFERENCES `Forum`(`forumId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`contentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentUrl` ADD CONSTRAINT `ContentUrl_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`contentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentImage` ADD CONSTRAINT `ContentImage_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`contentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLike` ADD CONSTRAINT `UserLike_likerId_fkey` FOREIGN KEY (`likerId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLike` ADD CONSTRAINT `UserLike_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commenterId_fkey` FOREIGN KEY (`commenterId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE CASCADE ON UPDATE CASCADE;
