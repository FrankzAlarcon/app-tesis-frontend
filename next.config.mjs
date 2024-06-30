/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "github.com"
      }, {
        hostname: "publications-images-business.s3.us-east-1.amazonaws.com"
      }
    ]
  }
};

export default nextConfig;
