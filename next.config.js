/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      /* Need /api/ for nextauth */
      {
        source: '/python_api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/python_api/:path*'
            : '/api/',
      },
      {
        source: '/docs',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/docs'
            : '/api/docs',
      },
      {
        source: '/openapi.json',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/openapi.json'
            : '/api/openapi.json',
      },
    ];
  },
};

module.exports = nextConfig;
