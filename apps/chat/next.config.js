const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  basePath: "/chat",
  assetPrefix: "/chat",
};

export default nextConfig;
