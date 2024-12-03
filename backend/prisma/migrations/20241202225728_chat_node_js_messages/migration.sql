-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "date_messageId" INTEGER;

-- CreateTable
CREATE TABLE "DateMessage" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "DateMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_date_messageId_fkey" FOREIGN KEY ("date_messageId") REFERENCES "DateMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
