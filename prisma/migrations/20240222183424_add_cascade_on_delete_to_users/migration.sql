-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_assignedBy_fkey";

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
