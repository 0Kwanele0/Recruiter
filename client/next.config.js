/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER: "https://dev-recruiter.herokuapp.com", //"http://localhost:3001",
  },
};

module.exports = nextConfig;
