-- AlterTable
ALTER TABLE "DateMessage" ADD COLUMN     "directMessageChannelId" INTEGER;

-- AddForeignKey
ALTER TABLE "DateMessage" ADD CONSTRAINT "DateMessage_directMessageChannelId_fkey" FOREIGN KEY ("directMessageChannelId") REFERENCES "DirectMessageChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
