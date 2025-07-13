/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push({
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
      });
      config.resolve.alias = {
        ...config.resolve.alias,
        bufferutil: false,
        "utf-8-validate": false,
      };
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ws: false,
      };
      config.node = {
        __dirname: true,
      };
    }
    config.ignoreWarnings = [/^Critical dependency:/];
    return config;
  },
};

module.exports = nextConfig;
