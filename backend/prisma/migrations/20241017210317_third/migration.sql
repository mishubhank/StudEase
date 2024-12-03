/*
  Warnings:

  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `des` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Tutor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Tutor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edu` to the `Tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offering` to the `Tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_email_key";

-- DropIndex
DROP INDEX "Student_id_key";

-- DropIndex
DROP INDEX "Tutor_email_key";

-- AlterTable
CREATE SEQUENCE student_id_seq;
ALTER TABLE "Student" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "studentId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('student_id_seq'),
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE student_id_seq OWNED BY "Student"."id";

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "des",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "edu" JSONB NOT NULL,
ADD COLUMN     "offering" JSONB NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Match_studentId_tutorId_key" ON "Match"("studentId", "tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_userId_key" ON "Tutor"("userId");

-- CreateIndex
CREATE INDEX "Tutor_active_idx" ON "Tutor"("active");

-- CreateIndex
CREATE INDEX "Tutor_offering_idx" ON "Tutor"("offering");

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
