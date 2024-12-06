/*
  Warnings:

  - You are about to drop the `ChannelOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelOnUsers" DROP CONSTRAINT "ChannelOnUsers_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelOnUsers" DROP CONSTRAINT "ChannelOnUsers_userId_fkey";

-- DropTable
DROP TABLE "ChannelOnUsers";
