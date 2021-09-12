import Link from 'next/link';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const style = {
    alink: {
        textDecoration: 'none',
    },
};

const ButtonBase = styled(Button, {
    name: 'btn-link-text',
})(({ theme }) => ({
    minHeight: '50px',
    color: theme.palette.border.light,
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(0, 8),
    '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.main,
    },
}));

//
const Links = ({ url, children, ...rest }) => (

    <Link href={`/${url}`}>
        <a href={`/${url}`} {...rest}>{children}</a>
    </Link>

);

//
const ButtonLink = ({ url, text }) => (

    <Links
        url={url}
        style={style.alink}
    >
        <ButtonBase>{text}</ButtonBase>
    </Links>

);

Links.defaultProps = {
    url: '',
};

Links.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.any,
};

ButtonLink.defaultProps = {
    text: '回首頁',
};

ButtonLink.propTypes = {
    url: PropTypes.string,
    text: PropTypes.string,
};

export {
    Links,
    ButtonLink,
};
