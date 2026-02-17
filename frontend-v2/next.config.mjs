/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.cmtradingco.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "customer-assets.emergentagent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
