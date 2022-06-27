const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
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
});
