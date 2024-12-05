/*
  Warnings:

  - You are about to drop the column `userId` on the `Direct_Message_Channel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Direct_Message_Channel" DROP CONSTRAINT "Direct_Message_Channel_userId_fkey";

-- AlterTable
ALTER TABLE "Direct_Message_Channel" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_Direct_Message_ChannelToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Direct_Message_ChannelToUser_AB_unique" ON "_Direct_Message_ChannelToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_Direct_Message_ChannelToUser_B_index" ON "_Direct_Message_ChannelToUser"("B");

-- AddForeignKey
ALTER TABLE "_Direct_Message_ChannelToUser" ADD CONSTRAINT "_Direct_Message_ChannelToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Direct_Message_Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Direct_Message_ChannelToUser" ADD CONSTRAINT "_Direct_Message_ChannelToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
