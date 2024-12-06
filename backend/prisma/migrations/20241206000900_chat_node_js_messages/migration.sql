/*
  Warnings:

  - You are about to drop the `DateMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DateMessage" DROP CONSTRAINT "DateMessage_channelId_fkey";

-- DropForeignKey
ALTER TABLE "DateMessage" DROP CONSTRAINT "DateMessage_directMessageChannelId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_dateMessageId_fkey";

-- DropTable
DROP TABLE "DateMessage";

-- CreateTable
CREATE TABLE "DateMessageByDirectMessageChannel" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "directMessageChannelId" INTEGER NOT NULL,

    CONSTRAINT "DateMessageByDirectMessageChannel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dateMessageId_fkey" FOREIGN KEY ("dateMessageId") REFERENCES "DateMessageByDirectMessageChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateMessageByDirectMessageChannel" ADD CONSTRAINT "DateMessageByDirectMessageChannel_directMessageChannelId_fkey" FOREIGN KEY ("directMessageChannelId") REFERENCES "DirectMessageChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
