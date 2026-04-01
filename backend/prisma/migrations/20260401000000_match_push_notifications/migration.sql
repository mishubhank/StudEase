-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('MATCH', 'MESSAGE', 'SYSTEM');

-- AlterTable
ALTER TABLE "Notification"
ADD COLUMN "deliveredAt" TIMESTAMP(3),
ADD COLUMN "matchId" INTEGER,
ALTER COLUMN "type" SET DATA TYPE "NotificationType"
USING (CASE
  WHEN "type" = 'message' THEN 'MESSAGE'::"NotificationType"
  WHEN "type" = 'match' THEN 'MATCH'::"NotificationType"
  ELSE 'SYSTEM'::"NotificationType"
END),
ALTER COLUMN "type" SET DEFAULT 'MATCH';

-- CreateIndex
CREATE INDEX "Notification_matchId_idx" ON "Notification"("matchId");

-- AddForeignKey
ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_matchId_fkey"
FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;
