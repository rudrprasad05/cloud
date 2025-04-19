import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    devIndicators: {
        appIsrStatus: false,
    },
    images: {
        domains: ['bucket.procyonfiji.com'], // Add your domain here
    },
};

export default nextConfig;
