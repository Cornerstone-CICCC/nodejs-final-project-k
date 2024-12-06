/*
  Warnings:

  - You are about to drop the `MessageByDirectMessageChannel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MessageByDirectMessageChannel" DROP CONSTRAINT "MessageByDirectMessageChannel_dateMessageIdByDirectMessage_fkey";

-- DropForeignKey
ALTER TABLE "MessageByDirectMessageChannel" DROP CONSTRAINT "MessageByDirectMessageChannel_userId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MessageByDirectMessageChannel";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dateMessageIdByDirectMessageChannel_fkey" FOREIGN KEY ("dateMessageIdByDirectMessageChannel") REFERENCES "DateMessageByDirectMessageChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
