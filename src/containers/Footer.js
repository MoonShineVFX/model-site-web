import { Fragment } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Grid, useMediaQuery } from '@mui/material';
import { FooterLayout, LangOptionLayout } from './globalLayout';
import Links from '../components/Links';
import Community from '../components/Community';
import useDeftags from '../utils/useDeftags';

// 語系選單
const LangOption = ({ deftag }) => {

    // Router
    const router = useRouter();

    // 選取語言
    const handleSelected = ({ target: { value } }) => {

        // url 更新
        router.push(router.asPath, router.asPath, { locale: value });

    };

    return (

        <LangOptionLayout
            name="lang"
            defaultValue={router.locale}
            onChange={handleSelected}
        >
            {
                router.locales.map((code) => (

                    // 僅支援繁中與英文
                    (code === 'zh' || code === 'en') &&
                        <option
                            key={code}
                            value={code}
                        >
                            {deftag?.[`lang_${code}`]}
                        </option>

                ))
            }
        </LangOptionLayout>

    );

};

//
const Footer = () => {

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));
    const [deftag] = useDeftags();

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
                        alt="logo small"
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
                                            {deftag?.text_privacy}
                                        </Links>

                                        <Links url="mailto:service@moonshine.tw" className="light" newPage>{deftag?.text_custom_service}: service@moonshine.tw</Links>
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
                                        {deftag?.text_privacy}
                                    </Links>
                                    <Links url="mailto:service@moonshine.tw" className="light" newPage>{deftag?.text_custom_service}: service@moonshine.tw</Links>
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

                    <LangOption deftag={deftag} />
                </Grid>
            </Grid>
        </FooterLayout>

    );

};

export default Footer;
