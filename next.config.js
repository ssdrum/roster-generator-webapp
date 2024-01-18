/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        // Cannot use /api as it is reserved for nextauth
        source: '/my_api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/api/:path*'
            : 'https://ca362-api.onrender.com/api/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
