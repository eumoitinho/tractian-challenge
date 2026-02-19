/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tractian-webpage.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "imgix.tractian.com",
      },
    ],
  },
};

export default nextConfig;
