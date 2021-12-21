module.exports = {
    env: {
        HOST: 'backend-52mayiffyq-de.a.run.app',
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
