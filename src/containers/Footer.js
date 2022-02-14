import dayjs from 'dayjs';
import { FooterLayout } from './globalLayout';
import Links from '../components/Links';
import Community from '../components/Community';
import deftag from '../utils/util.deftag';

const {
    footer: { text_privacy_link, text_custom_service },
} = deftag;

const Footer = () => (

    <FooterLayout>
        <section className="Model-container">
            <Community />

            <Links
                url="/privacy"
                newPage
                className="privacy-link"
            >
                {text_privacy_link}
            </Links>

            <p>
                {text_custom_service}: <Links url="mailto:service@moonshine.tw" newPage>service@moonshine.tw</Links>
            </p>
            <p>© {dayjs().format('YYYY')} All rights reserved. Moonshine</p>
        </section>
    </FooterLayout>

);

export default Footer;
