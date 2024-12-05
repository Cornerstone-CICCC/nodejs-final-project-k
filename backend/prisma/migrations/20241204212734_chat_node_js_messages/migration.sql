/*
  Warnings:

  - You are about to drop the column `Direct_MessagechannelId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Direct_MessageChannel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_Direct_MessagechannelId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Direct_MessagechannelId";

-- DropTable
DROP TABLE "Direct_MessageChannel";

-- CreateTable
CREATE TABLE "Direct_Message_Channel" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Direct_Message_Channel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Direct_Message_Channel" ADD CONSTRAINT "Direct_Message_Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
