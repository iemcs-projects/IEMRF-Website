/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Allow building even if lint errors exist (you can enable locally)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow building even if type errors exist (optional)
    ignoreBuildErrors: true,
  },
  images: {
    // Disable optimization to simplify local runs without extra deps
    unoptimized: true,
  },
}

export default nextConfig
