import Link from 'next/link';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const style = {
    alink: {
        textDecoration: 'none',
    },
};

const ButtonBase = styled(Button)(({ theme }) => ({
    minHeight: 'auto',
    lineHeight: 1,
    '&.default': {
        color: theme.palette.border.light,
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(4, 9),
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    '&.third': {
        fontSize: '1em',
        color: theme.palette.border.dark,
        border: `1px solid ${theme.palette.border.dark}`,
        borderRadius: 0,
        padding: theme.spacing(2, 4),
        '&:hover, &:focus': {
            color: theme.palette.border.main,
            border: `1px solid ${theme.palette.border.main}`,
        },
    },
}));

//
const Links = ({ url, children, ...rest }) => (

    <Link href={`/${url}`}>
        <a href={`/${url}`} {...rest}>{children}</a>
    </Link>

);

//
const ButtonLink = ({ url, text, type }) => (

    <Links
        url={url}
        style={style.alink}
    >
        <ButtonBase
            className={(type === 'third') ? 'third' : 'default'}
        >
            {text}
        </ButtonBase>
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
    type: 'default',
};

ButtonLink.propTypes = {
    url: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
};

export {
    Links,
    ButtonLink,
};
