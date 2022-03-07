import { useContext } from 'react';
import dayjs from 'dayjs';
import { Grid } from '@mui/material';
import { FooterLayout, LangOptionLayout } from './globalLayout';
import Links from '../components/Links';
import Community from '../components/Community';
import { GlobalContext } from '../context/global.state';
import deftag from '../utils/util.deftag';

const {
    lang,
    footer: {
        text_privacy_link,
        text_custom_service,
        text_lang_option,
    },
} = deftag;

// 語系選單
const LangOption = () => {

    // Context
    const { langOpt, globalDispatch } = useContext(GlobalContext);

    //
    const handleSelected = ({ target }) => {

        globalDispatch({ type: 'lang_option', payload: target.value, });

    };

    return (

        <LangOptionLayout
            name="lang"
            onChange={handleSelected}
        >
            <option value="">{text_lang_option}</option>

            {
                Object.keys(lang).map((code) => (

                    <option
                        key={code}
                        value={langOpt}
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
                xs={6}
            >
                <img
                    src="/favicon.ico"
                    alt=""
                    width=""
                    height=""
                />
                <span>© {dayjs().format('YYYY')} All rights reserved. Moonshine</span>
            </Grid>

            <Grid
                item
                xs={6}
                className="grid-right"
            >
                <Community />
                <LangOption />
            </Grid>
        </Grid>

        <Grid
            container
            className="container Model-container"
        >
            <Grid
                item
                xs={6}
            >
                <p>
                    {text_custom_service}: <Links url="mailto:service@moonshine.tw" newPage>service@moonshine.tw</Links>
                </p>
            </Grid>

            <Grid
                item
                xs={6}
                className="grid-right"
            >
                <Links
                    url="/privacy"
                    newPage
                    className="privacy-link"
                >
                    {text_privacy_link}
                </Links>
            </Grid>
        </Grid>
    </FooterLayout>

);

export default Footer;
