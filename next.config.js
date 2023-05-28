/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ktwzakzuaxzmalpgpdlz.supabase.co',
            port: '',
            pathname: '**',
          },
        ],
      },
}

module.exports = nextConfig
