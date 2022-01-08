/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.md$/, use: "raw-loader" });
    return config;
  },
};
