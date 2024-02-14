/*
  Warnings:

  - Added the required column `tempID` to the `shifts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shifts" ADD COLUMN     "tempID" TEXT NOT NULL;
