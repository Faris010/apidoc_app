/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'cdn.dribbble.com',
      'static.vecteezy.com',
    ],
  },
};

module.exports = nextConfig;
