import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Links from './Links';
import deftag from '../utils/util.deftag';

const {
    common: { text_logo },
} = deftag;

//
const LogoLayout = styled('div')(({ theme }) => ({
    fontSize: '28px',
    fontfamily : 'Leelawadee',
    fontWeight: 'bold',
    '.logo-text': {
        color: theme.palette.primary.main, // 未來會是真的 logo
        textDecoration: 'none',
    },
    '.pure-text': {
        cursor: 'default',
    },
}));

//
const Logo = ({ redirect, ...rest }) => (

    <LogoLayout {...rest}>
        <Links
            {...redirect && { url: '/' }}
            className={`logo-text ${redirect ? '' : 'pure-text'}`}
            title="Moonshine Logo"
        >
            {text_logo}
        </Links>
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
