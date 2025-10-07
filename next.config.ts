import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    console.log(`[NEXT.CONFIG] Aplicando Rewrites. API_URL: ${API_URL}`);

    return [
      {
        source: "/api/auth/login",
        destination: `${API_URL}/auth/login`,
      },
      {
        source: "/usuarios/:path*",
        destination: `${API_URL}/usuarios/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
