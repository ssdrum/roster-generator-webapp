import { fetchUsers } from "@/app/lib/data";

// Test page to display users
export default async function Page() {
  const users = await fetchUsers();

  return (
    <>
      {users.map((user) => {
        return <h1 key={user.id}>{user.name}</h1>;
      })}
    </>
  );
}
