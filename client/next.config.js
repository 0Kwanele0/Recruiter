/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER: "https://dev-recruiter.herokuapp.com",
    REACT_APP_SUPABASE_URL: "https://hgmdlhsskewonyrxyoun.supabase.co",
    REACT_APP_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnbWRsaHNza2V3b255cnh5b3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI5NjIzMjUsImV4cCI6MTk2ODUzODMyNX0.0owEZwy-uBTZ9lLh_GRbGceTct5MA0Bnfom1c8Nm3Bs",
  },
};

module.exports = nextConfig;
