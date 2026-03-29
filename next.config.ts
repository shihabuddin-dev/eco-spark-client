import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    const isDev = process.env.NODE_ENV !== "production";
    const backendUrl = isDev 
      ? "http://localhost:5000/api" 
      : (process.env.BACKEND_URL || "https://eco-spark-server.vercel.app/api");

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`, 
      },
    ];
  },
};

export default nextConfig;
