/*
  Warnings:

  - Added the required column `tempID` to the `shifts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shifts" ADD COLUMN     "tempID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "num_employees_assigned" (
    "id" TEXT NOT NULL,
    "shift" TEXT NOT NULL,

    CONSTRAINT "num_employees_assigned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "count_per_day" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "numAssigned" INTEGER NOT NULL,
    "numEmployeesAssignedId" TEXT,

    CONSTRAINT "count_per_day_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "num_employees_assigned" ADD CONSTRAINT "num_employees_assigned_shift_fkey" FOREIGN KEY ("shift") REFERENCES "shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "count_per_day" ADD CONSTRAINT "count_per_day_numEmployeesAssignedId_fkey" FOREIGN KEY ("numEmployeesAssignedId") REFERENCES "num_employees_assigned"("id") ON DELETE SET NULL ON UPDATE CASCADE;
