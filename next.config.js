/** @type {import('next').NextConfig} */

module.exports = {
  poweredByHeader: process.env.NODE_ENV === "development",
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};
