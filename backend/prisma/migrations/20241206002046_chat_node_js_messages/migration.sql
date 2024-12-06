/*
  Warnings:

  - You are about to drop the column `dateMessageId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_dateMessageId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "dateMessageId",
ADD COLUMN     "dateMessageIdByDirectMessageChannel" INTEGER;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dateMessageIdByDirectMessageChannel_fkey" FOREIGN KEY ("dateMessageIdByDirectMessageChannel") REFERENCES "DateMessageByDirectMessageChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
