-- CreateTable
CREATE TABLE "roster_assignment" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "roster_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift_assignment" (
    "id" TEXT NOT NULL,
    "shiftId" TEXT,
    "rosterAssignmentId" TEXT NOT NULL,

    CONSTRAINT "shift_assignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "roster_assignment" ADD CONSTRAINT "roster_assignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_assignment" ADD CONSTRAINT "shift_assignment_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "shifts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_assignment" ADD CONSTRAINT "shift_assignment_rosterAssignmentId_fkey" FOREIGN KEY ("rosterAssignmentId") REFERENCES "roster_assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
