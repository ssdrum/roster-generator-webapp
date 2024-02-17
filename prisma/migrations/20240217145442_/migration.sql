/*
  Warnings:

  - Added the required column `assignedBy` to the `num_employees_assigned` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "num_employees_assigned" ADD COLUMN     "assignedBy" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "num_employees_assigned" ADD CONSTRAINT "num_employees_assigned_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
