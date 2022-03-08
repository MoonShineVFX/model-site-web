import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Grid } from '@mui/material';
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
const Footer = () => (

    <FooterLayout>
        <Grid
            container
            className="container Model-container"
        >
            <Grid
                item
                xs={8}
                className="grid-left"
            >
                <img
                    src="/logo_small.png"
                    alt=""
                    width="30"
                    height="25"
                />

                <span>© {dayjs().format('YYYY')} All rights reserved. Moonshine</span>

                <Links
                    url="/privacy"
                    newPage
                    className="privacy-link"
                >
                    {text_privacy_link}
                </Links>

                <Links url="mailto:service@moonshine.tw" newPage>{text_custom_service}: service@moonshine.tw</Links>
            </Grid>

            <Grid
                item
                xs={4}
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

export default Footer;
