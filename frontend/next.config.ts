import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    devIndicators: {
        appIsrStatus: false,
    },
    images: {
        domains: ['bucket.procyonfiji.com'], // Add your domain here
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'standalone',
};

export default nextConfig;
