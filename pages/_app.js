import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles, Box } from '@mui/material';

// Context
import { GlobalProvider } from '../src/context/global.state';

import theme from '../src/utils/theme';
import Header from '../src/containers/Header';
import Content from '../src/containers/Content';
import Footer from '../src/containers/Footer';

const styles = {
    body: {
        fontFamily: '微軟正黑體, regular',
        color: '#fff',
        backgroundColor: '#1F2023',
        margin: 0,
    },
    '.Model-container': {
        width: '100%',
        maxWidth: '1200px',
        margin: 'auto',
    },
    '.Model-align': {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    '.Model-x-align': {
        left: '50%',
        transform: 'translateX(-50%)',
    },
    '.Model-y-align': {
        top: '50%',
        transform: 'translateY(-50%)',
    },
};

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
                <GlobalStyles styles={styles} />

                <GlobalProvider>
                    <Header />
                    <Box
                        component="main"
                        sx={{
                            display: 'flex',
                            marginTop: '90px',
                        }}
                    >
                        <Box
                            component="div"
                            className="Model-container"
                            sx={{
                                display: 'flex',
                                flexGrow: 1,
                                paddingTop: '20px',
                                paddingBottom: '20px',
                            }}
                        >
                            <Content
                                Component={Component}
                                pageProps={pageProps}
                            />
                        </Box>
                    </Box>
                    <Footer />
                </GlobalProvider>
            </ThemeProvider>
        </Fragment>

    );

};

export default WebSite;
