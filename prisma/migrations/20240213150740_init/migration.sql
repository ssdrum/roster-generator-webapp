/*
  Warnings:

  - Added the required column `workDays` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "workDays" INTEGER NOT NULL;
