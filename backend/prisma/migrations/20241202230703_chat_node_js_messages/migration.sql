/*
  Warnings:

  - You are about to drop the column `date_messageId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_date_messageId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "date_messageId",
ADD COLUMN     "dateMessageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dateMessageId_fkey" FOREIGN KEY ("dateMessageId") REFERENCES "DateMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
