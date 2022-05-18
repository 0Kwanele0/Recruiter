/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER: "https://dev-recruiter.herokuapp.com",
  },
};

module.exports = nextConfig;
