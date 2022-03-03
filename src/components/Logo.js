import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Links from './Links';
import deftag from '../utils/util.deftag';

const {
    common: { text_logo },
} = deftag;

//
const LogoLayout = styled('span')(({ theme }) => ({
    '.logo-text': {
        width: '200px',
    },
    'img': {
        height: '100%',
        verticalAlign: 'middle',
    },
    '.pure-text': {
        fontSize: '1.75em',
        fontWeight: 'bold',
        color: theme.palette.primary.main, // 表單會上文字 logo
        margin: '0', cursor: 'default',
    },
    [theme.breakpoints.down('middle')]: {
        fontSize: '1.4em',
    },
}));

//
const Logo = ({ redirect, ...rest }) => (

    <LogoLayout {...rest}>
        {
            redirect ? (

                <Links
                    url="/"
                    className="logo-text"
                    title={text_logo}
                >
                    <img
                        src="/moonshine_logo.png"
                        alt={text_logo}
                        width="291"
                        height="78"
                    />
                </Links>

            ) : <h1 className="pure-text">{text_logo}</h1>
        }
    </LogoLayout>

);

Logo.defaultProps = {
    redirect: true,
};

Logo.propTypes = {
    redirect: PropTypes.bool,
    children: PropTypes.any,
};

export default Logo;
