// /** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inksired.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
};
