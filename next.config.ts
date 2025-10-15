import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {


    return [
      {
        source: "/auth/:path*",
        destination: "http://localhost:8080/auth/:path*",
      },
      {
        source: "/usuarios/:path*",
        destination: "http://localhost:8080/usuarios/:path*",
      },
      {
        source: "/api/ocorrencias/:path*",
        destination: "http://localhost:8080/api/ocorrencias/:path*",
      },
    ];
  },
};

export default nextConfig;
