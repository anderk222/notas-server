/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Note_id_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Note_userId_id_key" ON "Note"("userId", "id");
