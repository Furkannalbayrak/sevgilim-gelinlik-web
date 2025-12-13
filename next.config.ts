import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.yesimgelinlik.com",
      },
      {
        protocol: "https",
        hostname: "cdn-europe.dugunbuketi.com",
      },
      {
        protocol: "https",
        hostname: "alissenuera.com",
      },
      {
        protocol: "https",
        hostname: "janroz.com.tr",
      },
      {
        protocol: "https",
        hostname: "cdn.dsmcdn.com",
      },
      {
        protocol: "https",
        hostname: "www.narinmoda.com",
      },
      {
        protocol: "https",
        hostname: "medihacambaz.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.davetcokelbisemyok.com",
      },
      {
        protocol: "https",
        hostname: "duguntrendy.com",
      },
    ],
  },
};

export default nextConfig;