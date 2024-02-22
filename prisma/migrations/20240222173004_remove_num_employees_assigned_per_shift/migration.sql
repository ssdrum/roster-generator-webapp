/*
  Warnings:

  - You are about to drop the `count_per_day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `num_employees_assigned` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "count_per_day" DROP CONSTRAINT "count_per_day_numEmployeesAssignedId_fkey";

-- DropForeignKey
ALTER TABLE "num_employees_assigned" DROP CONSTRAINT "num_employees_assigned_assignedBy_fkey";

-- DropForeignKey
ALTER TABLE "num_employees_assigned" DROP CONSTRAINT "num_employees_assigned_shift_fkey";

-- DropTable
DROP TABLE "count_per_day";

-- DropTable
DROP TABLE "num_employees_assigned";
