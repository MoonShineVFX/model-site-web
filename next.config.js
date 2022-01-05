module.exports = {
    env: {
        HOST: process.env.NEXT_PUBLIC_HOST || 'market.moonshine.tw',
    },
    async redirects () {
        return [
            {
                source: '/index',
                destination: '/',
                permanent: true,
            },
            // {
            //     source: '/:path((?!signin|register).*)',
            //     has: [
            //         {
            //             type: 'cookie',
            //             key: 'test',
            //             value: '123',
            //         },
            //     ],
            //     destination: '/signin',
            //     permanent: false,
            // },
        ]
    },
}
