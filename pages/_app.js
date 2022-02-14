import { Fragment } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles, Box } from '@mui/material';

// Context
import { GlobalProvider } from '../src/context/global.state';

import theme from '../src/utils/theme';
import HeadTag from '../src/containers/HeadTag';
import Header from '../src/containers/Header';
import Content from '../src/containers/Content';
import Footer from '../src/containers/Footer';

const styles = {
    body: {
        lineHeight: '1.6',
        fontSize: '1em',
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
    '.Model-effect-brightness': {
        filter: 'brightness(0.9)',
        transition: 'all .5s ease',
        '&:hover': {
            filter: 'brightness(1.2)',
        },
    },
    'img': {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover',
    },
    'select': {
        outline: 'none',
    },
    '.price': {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    '.web-line-clamp': {
        display: '-webkit-box',
        WebkitLineClamp: theme.lineClamp(),
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    '.Model-form-button': {
        '.model-button': {
            width: '100%',
            height: '70px',
            fontSize: '1.15em',
            borderRadius: '40px',
            '&.third': {
                borderRadius: '40px',
            },
        },
    },
    [theme.breakpoints.up('md')]: {
        '.web': {
            display: 'block',
        },
        '.mWeb': {
            display: 'none',
        },
    },
    [theme.breakpoints.down('md')]: {
        '.web': {
            display: 'none',
        },
        '.mWeb': {
            display: 'block',
        },
    },
};

//
const WebSite = ({ Component, pageProps }) => {

    return (

        <Fragment>
            <HeadTag />

            <ThemeProvider theme={theme}>
                <GlobalStyles styles={styles} />

                <GlobalProvider>
                    <Header />
                    <Box
                        component="main"
                        sx={{ display: 'flex' }}
                    >
                        <Box
                            component="div"
                            className="Model-container"
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
