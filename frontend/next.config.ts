import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
    // output: 'export',
    // trailingSlash: true,
    // images: { unoptimized: true },
    async rewrites() {
        return [
            {
                source: "/nextConfig",
                destination: "/api/nextConfig/",
            },
        ]
    }
};

export default nextConfig;
