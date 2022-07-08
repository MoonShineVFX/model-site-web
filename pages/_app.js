import dynamic from 'next/dynamic';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles, Box } from '@mui/material';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { GlobalProvider } from '../src/context/global.state';
import theme from '../src/utils/theme';
import util from '../src/utils/util';
import globalStyles from '../src/utils/globalStyles';

config.autoAddCss = false;

// dynamic
const Header = dynamic(() => import('../src/containers/Header'));
const Content = dynamic(() => import('../src/containers/Content'));
const Footer = dynamic(() => import('../src/containers/Footer'), { ssr: false });
const GoogleReCaptchaProvider = dynamic(() =>
    import('react-google-recaptcha-v3').then((mod) => mod.GoogleReCaptchaProvider)
);

//
const WebSite = ({ Component, pageProps, langs, ...rest }) => (

    <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStyles} />

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
                    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
                        <Content {...{ langs }}>
                            <Component
                                {...pageProps}
                                {...{
                                    langs,
                                    router: rest.router.state
                                }}
                            />
                        </Content>
                    </GoogleReCaptchaProvider>
                </Box>
            </Box>
            <Footer />
        </GlobalProvider>
    </ThemeProvider>

);

export default WebSite;

// 先撈詞條
WebSite.getInitialProps = async ({ ctx }) => {

    const resData = await util.serviceServer({ url: '/lang_configs' });
    const { data } = resData;
    return { langs: data.data[ctx.locale] };

}
