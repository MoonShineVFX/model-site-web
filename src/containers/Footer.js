import Link from 'next/link';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { styled } from '@mui/system';
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

const FooterBase = styled('footer')(({ theme }) => ({
    textAlign: 'center',
    '*': {
        color: theme.palette.border.light,
    },
    'a': {
        fontSize: '28px',
        margin: theme.spacing(0, 3),
        padding: theme.spacing(1),
    },
    'p': {
        fontSize: '14px',
        marginTop: theme.spacing(5),
    },
}));

//
const Footer = () => (

    <FooterBase>
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

            <p>© 2021 All rights reserved. Moonshine</p>
        </section>
    </FooterBase>

);

export default Footer;
