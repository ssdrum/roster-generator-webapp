/*
  Warnings:

  - The primary key for the `shifts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shiftEndTime` on the `shifts` table. All the data in the column will be lost.
  - You are about to drop the column `shiftId` on the `shifts` table. All the data in the column will be lost.
  - You are about to drop the column `shiftName` on the `shifts` table. All the data in the column will be lost.
  - You are about to drop the column `shiftStartTime` on the `shifts` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `shifts` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `shifts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `shifts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `shifts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_shift_fkey";

-- AlterTable
ALTER TABLE "shifts" DROP CONSTRAINT "shifts_pkey",
DROP COLUMN "shiftEndTime",
DROP COLUMN "shiftId",
DROP COLUMN "shiftName",
DROP COLUMN "shiftStartTime",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD CONSTRAINT "shifts_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_shift_fkey" FOREIGN KEY ("shift") REFERENCES "shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
