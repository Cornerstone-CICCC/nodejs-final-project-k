-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "dateMessageIdByChannel" INTEGER;

-- CreateTable
CREATE TABLE "DateMessageByChannel" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelId" INTEGER NOT NULL,

    CONSTRAINT "DateMessageByChannel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dateMessageIdByChannel_fkey" FOREIGN KEY ("dateMessageIdByChannel") REFERENCES "DateMessageByChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateMessageByChannel" ADD CONSTRAINT "DateMessageByChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
