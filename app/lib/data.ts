import prisma from "@/app/lib/prisma";

/* Collection of functions to interact with database */

// Fetches all users from database
export async function fetchUsers() {
    const users = await prisma.user.findMany();
    return users;
}
