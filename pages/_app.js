import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// Context
import { GlobalProvider } from '../src/context/global.state';

import Header from '../src/containers/Header';
import Content from '../src/containers/Content';

const theme = createTheme();

//
const WebSite = ({ Component, pageProps }) => {

    const router = useRouter();

    // useEffect(() => {

    //     const handleRouteChange = (url, { shallow }) => {

    //         console.log(
    //             `App is changing to ${url} ${
    //             shallow ? 'with' : 'without'
    //             } shallow routing`
    //         );

    //     };

    //     router.events.on('routeChangeStart', handleRouteChange);

    //     return () => {

    //         router.events.off('routeChangeStart', handleRouteChange);

    //     };

    // }, []);

    return (

        <Fragment>
            <Head>
                <title>模型平台</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <ThemeProvider theme={theme}>
                <GlobalProvider>
                    <Box sx={{ display: 'flex' }}>
                        <Header />
                        <Box
                            component="main"
                            sx={{
                                maxWidth: '1200px',
                                display: 'flex',
                                flexGrow: 1,
                                margin: '64px auto 0',
                                paddingTop: '40px',
                                paddingBottom: '40px',
                            }}
                        >
                            <Content
                                Component={Component}
                                pageProps={pageProps}
                            />
                        </Box>
                    </Box>
                </GlobalProvider>
            </ThemeProvider>
        </Fragment>

    );

};

export default WebSite;
