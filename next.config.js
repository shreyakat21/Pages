/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/b/id/**', // Matches paths like /b/id/12350872-M.jpg
      },
    ],
  },
}

module.exports = nextConfig