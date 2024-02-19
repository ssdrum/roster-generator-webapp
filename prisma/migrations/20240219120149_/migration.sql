/*
  Warnings:

  - Made the column `email` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "email" SET NOT NULL;
