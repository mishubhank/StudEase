-- DropIndex
DROP INDEX "Tutor_id_key";

-- AlterTable
CREATE SEQUENCE tutor_id_seq;
ALTER TABLE "Tutor" ALTER COLUMN "id" SET DEFAULT nextval('tutor_id_seq'),
ALTER COLUMN "name" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE tutor_id_seq OWNED BY "Tutor"."id";
