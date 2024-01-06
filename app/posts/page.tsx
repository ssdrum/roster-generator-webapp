/* Example of a server component fetching from the database */
import { fetchPosts } from "@/app/lib/data";

export default async function Page() {
  const posts = await fetchPosts()
  // console.log works in the terminal in this case
  console.log(posts)
}
