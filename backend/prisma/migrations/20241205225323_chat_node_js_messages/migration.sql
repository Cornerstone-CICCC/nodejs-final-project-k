/*
  Warnings:

  - You are about to drop the column `messageChannelId` on the `DateMessage` table. All the data in the column will be lost.
  - You are about to drop the `MessageChannel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channelId` to the `DateMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DateMessage" DROP CONSTRAINT "DateMessage_messageChannelId_fkey";

-- AlterTable
ALTER TABLE "DateMessage" DROP COLUMN "messageChannelId",
ADD COLUMN     "channelId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MessageChannel";

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DateMessage" ADD CONSTRAINT "DateMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
