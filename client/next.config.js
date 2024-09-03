// /** @type {import('next').NextConfig} **/
// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'inksired.s3.eu-north-1.amazonaws.com',
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inksired.s3.eu-north-1.amazonaws.com',
      },
    ],
    // Agrega otros ajustes para imágenes si es necesario
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/proxy/:path*',
      },
      // Puedes agregar más reglas de reescritura según sea necesario
    ];
  },
  // Agrega otras configuraciones necesarias aquí
};

export default nextConfig;
