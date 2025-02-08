import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    devIndicators: {
        appIsrStatus: false,
    },
    images: {
        domains: ['mctechfiji.s3.amazonaws.com'], // Add your domain here
    },
};

export default nextConfig;
