/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

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

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
