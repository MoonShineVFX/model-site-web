module.exports = {
    async redirects() {
        return [
            {
                source: '/index',
                destination: '/',
                permanent: true,
            },
            // {
            //     source: '/product/list',
            //     destination: '/product/list?page=1',
            //     permanent: true,
            // },
        ]
    },
}
