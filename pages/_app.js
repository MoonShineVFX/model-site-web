import { Fragment, useEffect } from 'react';
import Head from 'next/head';
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
        lineHeight: '1.6',
        fontFamily: 'Arial, 文泉驛正黑, WenQuanYi Zen Hei, 儷黑 Pro, LiHei Pro, 微軟正黑體, Microsoft JhengHei',
        color: '#fff',
        backgroundColor: '#1F2023',
        margin: 0,
        '*': {
            boxSizing: 'border-box',
        },
    },
    a: {
        display: 'inline-block',
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
    '.Model-clear-box': {
        '&:after': {
            content: '""',
            display: 'block',
            clear: 'both',
        },
    },
    '.price': {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
};

//
const WebSite = ({ Component, pageProps }) => {

    return (

        <Fragment>
            <Head>
                <title>模型平台</title>
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>

            <ThemeProvider theme={theme}>
                <GlobalStyles styles={styles} />

                <GlobalProvider>
                    <Header />
                    <Box
                        component='main'
                        sx={{ display: 'flex' }}
                    >
                        <Box
                            component='div'
                            className='Model-container'
                            sx={{
                                paddingTop: '20px',
                                paddingBottom: '20px',
                            }}
                        >
                            <Content>
                                <Component {...pageProps} />
                            </Content>
                        </Box>
                    </Box>
                    <Footer />
                </GlobalProvider>
            </ThemeProvider>
        </Fragment>

    );

};

export default WebSite;
