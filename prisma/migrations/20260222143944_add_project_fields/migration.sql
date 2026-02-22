/*
  Warnings:

  - You are about to drop the column `client_name` on the `briefings` table. All the data in the column will be lost.
  - Added the required column `client_names` to the `briefings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_name` to the `briefings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "briefings" DROP COLUMN "client_name",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "client_names" TEXT NOT NULL,
ADD COLUMN     "project_name" TEXT NOT NULL,
ADD COLUMN     "state" TEXT;
