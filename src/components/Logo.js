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
    [theme.breakpoints.down('middle')]: {
        fontSize: '1.4em',
    },
}));

//
const Logo = ({ ...rest }) => (

    <LogoLayout {...rest}>
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
    </LogoLayout>

);

Logo.propTypes = {
    children: PropTypes.any,
};

export default Logo;
