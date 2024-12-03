/*
  Warnings:

  - You are about to drop the column `Area` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `about` on the `Tutor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "Area",
ADD COLUMN     "rea" TEXT;

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "about",
ADD COLUMN     "degree" TEXT,
ADD COLUMN     "specilization" TEXT,
ALTER COLUMN "edu" DROP NOT NULL;
