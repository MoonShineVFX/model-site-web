import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import Links from '../components/Links';
import FontIcon from '../components/FontIcon';
import deftag from '../utils/util.deftag';

const {
    footer: { text_privacy_link, text_custom_service },
} = deftag;

// 串流平台
const socialMedia = [
    {
        url: 'https://www.instagram.com/moonshine.tw/?hl=zh-tw',
        icon: faInstagram,
    },
    {
        url: 'https://www.facebook.com/MoonShineAnimation',
        icon: faFacebookSquare,
    },
];

const FooterLayout = styled('footer')(({ theme }) => ({
    textAlign: 'center',
    marginTop: '100px',
    marginBottom: '40px',
    '*': {
        color: theme.palette.textColor,
    },
    '.social-item': {
        fontSize: '1.8em',
        margin: theme.spacing(0, 3),
        padding: theme.spacing(1),
    },
    '.privacy-link': {
        textDecoration: 'none',
        marginTop: '10px',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    'p': {
        marginTop: theme.spacing(5),
    },
}));

//
const Footer = () => (

    <FooterLayout>
        <section className="Model-container">
            <div>
                {
                    socialMedia.map(({ url, icon }, idx) => (

                        <Links
                            key={idx}
                            url={url}
                            newPage
                            className="social-item"
                        >
                            <FontIcon icon={icon} />
                        </Links>

                    ))
                }
            </div>

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
