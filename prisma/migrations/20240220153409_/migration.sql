-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "workDays" INTEGER[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "employedBy" TEXT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shifts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "shift" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "num_employees_assigned" (
    "id" TEXT NOT NULL,
    "shift" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_employedBy_fkey" FOREIGN KEY ("employedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_shift_fkey" FOREIGN KEY ("shift") REFERENCES "shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "num_employees_assigned" ADD CONSTRAINT "num_employees_assigned_shift_fkey" FOREIGN KEY ("shift") REFERENCES "shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "num_employees_assigned" ADD CONSTRAINT "num_employees_assigned_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "count_per_day" ADD CONSTRAINT "count_per_day_numEmployeesAssignedId_fkey" FOREIGN KEY ("numEmployeesAssignedId") REFERENCES "num_employees_assigned"("id") ON DELETE SET NULL ON UPDATE CASCADE;
