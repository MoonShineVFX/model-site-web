import { Fragment } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Grid, useMediaQuery } from '@mui/material';
import { FooterLayout, LangOptionLayout } from './globalLayout';
import Links from '../components/Links';
import Community from '../components/Community';
import deftag from '../utils/util.deftag';

const {
    lang,
    footer: {
        text_privacy_link,
        text_custom_service,
    },
} = deftag;

// 語系選單
const LangOption = () => {

    // Router
    const router = useRouter();

    // 選取語言
    const handleSelected = ({ target }) => {

        router.push(router.asPath, router.asPath, { locale: target.value });

    };

    return (

        <LangOptionLayout
            name="lang"
            defaultValue={router.locale}
            onChange={handleSelected}
        >
            {
                Object.keys(lang).map((code) => (

                    <option
                        key={code}
                        value={code}
                    >
                        {lang[code]}
                    </option>

                ))
            }
        </LangOptionLayout>

    );

};

//
const Footer = () => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));

    return (

        <FooterLayout>
            <Grid
                container
                className="container Model-container"
            >
                <Grid
                    item
                    xs={12}
                    mobile={9}
                    className="grid-left"
                >
                    <img
                        src="/logo_small.png"
                        alt=""
                        width="41"
                        height="32"
                    />

                    {
                        matches ? (

                            <Fragment>
                                <span className="copyright">© {dayjs().format('YYYY')} All rights reserved. Moonshine</span>
                                <div className="top">
                                    <div className="link">
                                        <Links
                                            url="/privacy"
                                            newPage
                                            className="light privacy-link"
                                        >
                                            {text_privacy_link}
                                        </Links>

                                        <Links url="mailto:service@moonshine.tw" className="light" newPage>{text_custom_service}: service@moonshine.tw</Links>
                                    </div>
                                    <p className="bottom">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
                                </div>
                            </Fragment>

                        ) : (

                            <span>
                                <div className="top">
                                    <span>© {dayjs().format('YYYY')} All rights reserved. Moonshine</span>
                                    <Links
                                        url="/privacy"
                                        newPage
                                        className="light privacy-link"
                                    >
                                        {text_privacy_link}
                                    </Links>
                                    <Links url="mailto:service@moonshine.tw" className="light" newPage>{text_custom_service}: service@moonshine.tw</Links>
                                </div>
                                <div className="bottom">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</div>
                            </span>

                        )
                    }
                </Grid>

                <Grid
                    item
                    xs={12}
                    mobile={3}
                    className="grid-right"
                >
                    {
                        // Betty: 暫且沒有社群
                        false && <Community />
                    }

                    <LangOption />
                </Grid>
            </Grid>
        </FooterLayout>

    );

};

export default Footer;
