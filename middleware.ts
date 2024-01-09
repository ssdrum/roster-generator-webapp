export { default } from 'next-auth/middleware'

// Add routes to be protected here
export const config = {
    matcher: [
        "/dashboard",
        "/users"
    ]
}
