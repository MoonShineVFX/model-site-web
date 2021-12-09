import Link from 'next/link';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

//
const style = {
    alink: {
        textDecoration: 'none',
    },
};

//
const ButtonLayout = styled(Button)(({ theme }) => ({
    minHeight: 'auto',
    lineHeight: 1,
    '&.default': {
        color: theme.palette.textColor,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(4, 9),
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    '&.third': {
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
const Links = ({ url, newPage, title, className, children, ...rest }) => (

    <Link href={url}>
        <a
            href={url}
            title={title}
            className={className}
            {...newPage && { target: '_blank'}}
            {...rest}
        >
            {children}
        </a>
    </Link>

);

//
const ButtonLink = ({ url, text, type, ...rest }) => (

    <Links
        url={url}
        style={style.alink}
        {...rest}
    >
        <ButtonLayout
            className={`${(type === 'third') ? 'third' : 'default'} model-button`}
        >
            {text}
        </ButtonLayout>
    </Links>

);

Links.defaultProps = {
    url: '',
    newPage: false,
};

Links.propTypes = {
    url: PropTypes.string.isRequired,
    newPage: PropTypes.bool,
    title: PropTypes.string,
    className: PropTypes.string,
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
    Links as default,
    ButtonLink,
};
