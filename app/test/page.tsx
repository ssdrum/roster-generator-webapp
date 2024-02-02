import { getUserSession } from '@/app/lib/session';

// Test page to display users
export default async function Page() {
  const user = await getUserSession();

  console.log(user);

  return <h1>Hello</h1>;
}
