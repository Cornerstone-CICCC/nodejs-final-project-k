/*
  Warnings:

  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_dateMessageIdByDirectMessageChannel_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "MessageByDirectMessageChannel" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "dateMessageIdByDirectMessageChannel" INTEGER,

    CONSTRAINT "MessageByDirectMessageChannel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MessageByDirectMessageChannel" ADD CONSTRAINT "MessageByDirectMessageChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageByDirectMessageChannel" ADD CONSTRAINT "MessageByDirectMessageChannel_dateMessageIdByDirectMessage_fkey" FOREIGN KEY ("dateMessageIdByDirectMessageChannel") REFERENCES "DateMessageByDirectMessageChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
