/*
  Warnings:

  - A unique constraint covering the columns `[sub_id]` on the table `Direct_MessageChannel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Direct_MessageChannel_sub_id_key" ON "Direct_MessageChannel"("sub_id");
