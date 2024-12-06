/*
  Warnings:

  - Added the required column `messageChannelId` to the `DateMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DateMessage" ADD COLUMN     "messageChannelId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MessageChannel" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "MessageChannel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DateMessage" ADD CONSTRAINT "DateMessage_messageChannelId_fkey" FOREIGN KEY ("messageChannelId") REFERENCES "MessageChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
