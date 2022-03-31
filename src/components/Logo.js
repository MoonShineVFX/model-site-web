import { styled } from '@mui/system';
import Links from './Links';
import useDeftags from '../utils/useDeftags';

const LogoLayout = styled('span')(({ theme }) => ({
    '.logo-text': {
        width: '170px',
    },
    'img': {
        height: '100%',
        verticalAlign: 'middle',
    },
    [theme.breakpoints.down('middle')]: {
        fontSize: '1.4em',
    },
}));

//
const Logo = ({ ...rest }) => {

    // Hook
    const [deftag] = useDeftags();

    return (

        <LogoLayout {...rest}>
            <Links
                url="/"
                className="logo-text"
                title={deftag?.text_logo}
            >
                <img
                    src="/logo_large.png"
                    alt={deftag?.text_logo}
                    width="291"
                    height="78"
                />
            </Links>
        </LogoLayout>

    );

};

export default Logo;
