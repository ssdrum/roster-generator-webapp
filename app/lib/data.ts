/* Collection of async functions to fetch data */
import { sql } from '@vercel/postgres';
import { Post } from './definitions';

// Fetches posts from example table "posts"
export async function fetchPosts() {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    try {
        const data = await sql<Post>`SELECT * FROM posts`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch posts data.');
    }
}
