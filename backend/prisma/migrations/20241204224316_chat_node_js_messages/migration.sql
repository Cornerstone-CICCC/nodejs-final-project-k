/*
  Warnings:

  - You are about to drop the `Direct_Message_Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Direct_Message_ChannelToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Direct_Message_ChannelToUser" DROP CONSTRAINT "_Direct_Message_ChannelToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_Direct_Message_ChannelToUser" DROP CONSTRAINT "_Direct_Message_ChannelToUser_B_fkey";

-- DropTable
DROP TABLE "Direct_Message_Channel";

-- DropTable
DROP TABLE "_Direct_Message_ChannelToUser";

-- CreateTable
CREATE TABLE "DirectMessageChannel" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "DirectMessageChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectMessageChannelOnUsers" (
    "userId" INTEGER NOT NULL,
    "directMessageChannelId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "DirectMessageChannelOnUsers_pkey" PRIMARY KEY ("userId","directMessageChannelId")
);

-- AddForeignKey
ALTER TABLE "DirectMessageChannelOnUsers" ADD CONSTRAINT "DirectMessageChannelOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessageChannelOnUsers" ADD CONSTRAINT "DirectMessageChannelOnUsers_directMessageChannelId_fkey" FOREIGN KEY ("directMessageChannelId") REFERENCES "DirectMessageChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
