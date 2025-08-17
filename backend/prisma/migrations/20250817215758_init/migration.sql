/*
  Warnings:

  - The values [EMAIL] on the enum `VerificationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."VerificationType_new" AS ENUM ('REGISTRATION', 'PASSWORD_RESET');
ALTER TABLE "public"."UserVerification" ALTER COLUMN "type" TYPE "public"."VerificationType_new" USING ("type"::text::"public"."VerificationType_new");
ALTER TYPE "public"."VerificationType" RENAME TO "VerificationType_old";
ALTER TYPE "public"."VerificationType_new" RENAME TO "VerificationType";
DROP TYPE "public"."VerificationType_old";
COMMIT;
