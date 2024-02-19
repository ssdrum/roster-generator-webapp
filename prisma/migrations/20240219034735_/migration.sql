/*
  Warnings:

  - You are about to drop the `roster_assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shift_assignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roster_assignment" DROP CONSTRAINT "roster_assignment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "shift_assignment" DROP CONSTRAINT "shift_assignment_rosterAssignmentId_fkey";

-- DropForeignKey
ALTER TABLE "shift_assignment" DROP CONSTRAINT "shift_assignment_shiftId_fkey";

-- DropTable
DROP TABLE "roster_assignment";

-- DropTable
DROP TABLE "shift_assignment";
