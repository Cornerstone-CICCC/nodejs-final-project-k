/*
  Warnings:

  - You are about to drop the column `sub_id` on the `Direct_MessageChannel` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Direct_MessageChannel_sub_id_key";

-- AlterTable
ALTER TABLE "Direct_MessageChannel" DROP COLUMN "sub_id";
