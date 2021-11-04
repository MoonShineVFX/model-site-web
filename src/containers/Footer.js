import Link from 'next/link';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import FontIcon from '../components/FontIcon';

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
    'a': {
        fontSize: '1.8em',
        margin: theme.spacing(0, 3),
        padding: theme.spacing(1),
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

                        <Link
                            key={idx}
                            href={url}
                        >
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontIcon icon={icon} />
                            </a>
                        </Link>

                    ))
                }
            </div>

            <p>© {dayjs().format('YYYY')} All rights reserved. Moonshine</p>
        </section>
    </FooterLayout>

);

export default Footer;
