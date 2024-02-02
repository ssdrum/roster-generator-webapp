import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Run npx prisma migrate dev --name "name of the migration" to generate database
// Run npx prisma db seed to seed database
// Run npx prisma studio to view/edit database from the browser

// Loads test data into database
const load = async () => {
  try {
    // Create 3 dummy users
    const sarah = await prisma.user.upsert({
      where: { email: 'sarah.johnson@email.com' },
      update: { name: 'Sarah Johnson' },
      create: { name: 'Sarah Johnson', email: 'sarah.johnson@email.com' },
    });

    const alex = await prisma.user.upsert({
      where: { email: 'alex.miller@email.com' },
      update: { name: 'Alex Miller' },
      create: { name: 'Alex Miller', email: 'alex.miller@email.com' },
    });

    const emily = await prisma.user.upsert({
      where: { email: 'emily.davis@email.com' },
      update: { name: 'Emily Davis' },
      create: { name: 'Emily Davis', email: 'emily.davis@email.com' },
    });

    // Load 2 dummy shifts per user
    const sarahMorning = await prisma.shift.create({
      data: {
        name: 'Morning Shift',
        startTime: '06:00',
        endTime: '14:00',
        createdBy: sarah.id,
      },
    });
    const sarahEvening = await prisma.shift.create({
      data: {
        name: 'Evening Shift',
        startTime: '15:00',
        endTime: '21:00',
        createdBy: sarah.id,
      },
    });
    const alexMorning = await prisma.shift.create({
      data: {
        name: 'Morning Shift',
        startTime: '06:00',
        endTime: '14:00',
        createdBy: alex.id,
      },
    });
    const alexEvening = await prisma.shift.create({
      data: {
        name: 'Evening Shift',
        startTime: '15:00',
        endTime: '21:00',
        createdBy: alex.id,
      },
    });
    const emilyMorning = await prisma.shift.create({
      data: {
        name: 'Morning Shift',
        startTime: '06:00',
        endTime: '14:00',
        createdBy: emily.id,
      },
    });
    const emilyEvening = await prisma.shift.create({
      data: {
        name: 'Evening Shift',
        startTime: '15:00',
        endTime: '21:00',
        createdBy: emily.id,
      },
    });

    // Create 3 dummy employees for each user
    const james = await prisma.employee.upsert({
      where: { email: 'james.anderson@companyemail.com' },
      create: {
        name: 'James Anderson',
        email: 'james.anderson@companyemail.com',
        employedBy: sarah.id,
      },
      update: {},
    });
    const lauren = await prisma.employee.upsert({
      where: { email: 'lauren.taylor@companyemail.com' },
      create: {
        name: 'Lauren Taylor',
        email: 'lauren.taylor@companyemail.com',
        employedBy: sarah.id,
      },
      update: {},
    });

    // Create assignments
    const assign1 = await prisma.assignment.create({
      data: {
        assignedTo: james.id,
        shift: sarahMorning.id,
        assignedBy: sarah.id, // Check that sarah.id corresponds to an existing user
        day: 1,
      },
    });
    const assign2 = await prisma.assignment.create({
      data: {
        assignedTo: lauren.id,
        shift: sarahMorning.id,
        assignedBy: sarah.id, // Check that sarah.id corresponds to an existing user
        day: 2,
      },
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
