import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles, Box } from '@mui/material';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { GlobalProvider } from '../src/context/global.state';
import theme from '../src/utils/theme';
import Header from '../src/containers/Header';
import Content from '../src/containers/Content';
import Footer from '../src/containers/Footer';
import util from '../src/utils/util';
import globalStyles from '../src/utils/globalStyles';

config.autoAddCss = false;

//
const WebSite = ({ Component, pageProps, langs, ...rest }) => (

    <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStyles} />

        <GlobalProvider>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
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
                        <Content {...{ langs }}>
                            <Component
                                {...pageProps}
                                {...{
                                    langs,
                                    router: rest.router.state
                                }}
                            />
                        </Content>
                    </Box>
                </Box>
                <Footer />
            </GoogleReCaptchaProvider>
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
