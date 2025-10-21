declare module "next-pwa" {
  import type { NextConfig } from "next";

  export interface PWAOptions {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    buildExcludes?: string[];
    runtimeCaching?: RuntimeCaching[];
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
    };
  }

  export default function withPWA(
    options: PWAOptions
  ): (config: NextConfig) => NextConfig;
}
declare module "next-pwa/cache" {
  import type { RuntimeCaching } from "next-pwa";
  const runtimeCaching: RuntimeCaching[];
  export default runtimeCaching;
}
