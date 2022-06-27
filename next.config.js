const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const config = {
    env: {
        HOST: process.env.NEXT_PUBLIC_HOST || 'market.moonshine.tw',
    },
    i18n: {
        locales: ['zh', 'en', 'jp', 'cn'],
        defaultLocale: 'zh',
        localeDetection: false,
    },
    images: {
        domains: ['market-dev.moonshine.tw', 'market.moonshine.tw'],
        formats: ['image/avif', 'image/webp'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects () {
        return [
            {
                source: '/index',
                destination: '/',
                permanent: true,
            },
        ]
    },
};

module.exports = (phase, { defaultConfig }) => {

    if (phase === PHASE_DEVELOPMENT_SERVER) {

        const withBundleAnalyzer = require('@next/bundle-analyzer')({
            enabled: process.env.ANALYZE === 'true',
        });

        return withBundleAnalyzer(config);

    }

    return config;

};
