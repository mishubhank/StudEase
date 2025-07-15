/*
  Warnings:

  - You are about to drop the column `lat` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `offering` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `About` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_matchId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropIndex
DROP INDEX "Tutor_offering_idx";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "long" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "About" TEXT NOT NULL,
ADD COLUMN     "locationId" INTEGER,
ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "lat",
DROP COLUMN "long",
DROP COLUMN "offering";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER,
    "recipientId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubjectToTutor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Notification_recipientId_idx" ON "Notification"("recipientId");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToTutor_AB_unique" ON "_SubjectToTutor"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToTutor_B_index" ON "_SubjectToTutor"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTutor" ADD CONSTRAINT "_SubjectToTutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTutor" ADD CONSTRAINT "_SubjectToTutor_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
