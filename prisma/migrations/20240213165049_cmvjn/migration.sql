/*
  Warnings:

  - The primary key for the `shifts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endTime` on the `shifts` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `shifts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `shifts` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `shifts` table. All the data in the column will be lost.
  - Added the required column `shiftEndTime` to the `shifts` table without a default value. This is not possible if the table is not empty.
  - The required column `shiftId` was added to the `shifts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `shiftName` to the `shifts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftStartTime` to the `shifts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_shift_fkey";

-- AlterTable
ALTER TABLE "shifts" DROP CONSTRAINT "shifts_pkey",
DROP COLUMN "endTime",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "startTime",
ADD COLUMN     "shiftEndTime" TEXT NOT NULL,
ADD COLUMN     "shiftId" TEXT NOT NULL,
ADD COLUMN     "shiftName" TEXT NOT NULL,
ADD COLUMN     "shiftStartTime" TEXT NOT NULL,
ADD CONSTRAINT "shifts_pkey" PRIMARY KEY ("shiftId");

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_shift_fkey" FOREIGN KEY ("shift") REFERENCES "shifts"("shiftId") ON DELETE RESTRICT ON UPDATE CASCADE;
