-- AlterTable
ALTER TABLE "User" ADD COLUMN     "channelId" INTEGER;

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "sub_id" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
