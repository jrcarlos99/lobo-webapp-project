import type { NextConfig } from "next";
import withPWA from "next-pwa";

// Tipagem manual para runtimeCaching

interface CacheExpirationOptions {
  maxEntries?: number;
  maxAgeSeconds?: number;
}

interface RuntimeCachingOptions {
  cacheName?: string;
  expiration?: CacheExpirationOptions;
  networkTimeoutSeconds?: number;
  cacheableResponse?: {
    statuses?: number[];
    headers?: Record<string, string>;
  };
}
interface RuntimeCaching {
  urlPattern: RegExp | string;
  handler: "CacheFirst" | "NetworkFirst" | "StaleWhileRevalidate";
  options?: RuntimeCachingOptions;
}

// Definição customizada de cache
const runtimeCaching: RuntimeCaching[] = [
  // Cache de ícones
  {
    urlPattern: /^\/icons\/.*\.(png|svg|jpg|jpeg|ico)$/,
    handler: "CacheFirst",
    options: {
      cacheName: "icons-cache",
      expiration: {
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      },
    },
  },
  // Cache do manifest
  {
    urlPattern: /^\/manifest\.json$/,
    handler: "CacheFirst",
    options: {
      cacheName: "manifest-cache",
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      },
    },
  },
  // Cache das páginas de relatórios
  {
    urlPattern: /^\/relatorio\/.*/,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "relatorios-cache",
      expiration: {
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 7,
      },
    },
  },
  // Cache das chamadas à API de ocorrências
  {
    urlPattern: /\/api\/ocorrencias\/.*/,
    handler: "NetworkFirst",
    options: {
      cacheName: "api-ocorrencias-cache",
      networkTimeoutSeconds: 10,
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24,
      },
    },
  },
];

const withPWAFinal = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
  fallbacks: {
    document: "/offline",
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["unrhmvzxjpkibttjigom.supabase.co"],
  },
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
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
          destination: "http://localhost:8082/api/ocorrencias/:path*",
        },
      ];
    }
    return [];
  },
};

export default withPWAFinal(nextConfig);
