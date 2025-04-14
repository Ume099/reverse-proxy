/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/tailwind-config"],
  assetPrefix: "http://localhost:2999/office",
};

export default nextConfig;
