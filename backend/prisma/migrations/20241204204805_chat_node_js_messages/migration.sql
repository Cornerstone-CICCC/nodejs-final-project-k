/*
  Warnings:

  - You are about to drop the column `channelId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_channelId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "channelId",
ADD COLUMN     "Direct_MessagechannelId" INTEGER;

-- DropTable
DROP TABLE "Channel";

-- CreateTable
CREATE TABLE "Direct_MessageChannel" (
    "id" SERIAL NOT NULL,
    "sub_id" TEXT NOT NULL,

    CONSTRAINT "Direct_MessageChannel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_Direct_MessagechannelId_fkey" FOREIGN KEY ("Direct_MessagechannelId") REFERENCES "Direct_MessageChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
