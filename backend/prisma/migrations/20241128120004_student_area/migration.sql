/*
  Warnings:

  - You are about to drop the column `rea` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "rea",
ADD COLUMN     "Area" TEXT;
