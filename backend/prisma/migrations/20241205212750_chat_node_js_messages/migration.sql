/*
  Warnings:

  - Made the column `directMessageChannelId` on table `DateMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DateMessage" DROP CONSTRAINT "DateMessage_directMessageChannelId_fkey";

-- AlterTable
ALTER TABLE "DateMessage" ALTER COLUMN "directMessageChannelId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "DateMessage" ADD CONSTRAINT "DateMessage_directMessageChannelId_fkey" FOREIGN KEY ("directMessageChannelId") REFERENCES "DirectMessageChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
