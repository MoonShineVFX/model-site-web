import { Toolbar } from '@mui/material';
import { styled } from '@mui/system';

/** Header */
const AppBarLayout = styled('header')(({ theme }) => ({
    backgroundColor: theme.palette.bgColor,
    boxShadow: 'none',
}));

//
const HeaderLayout = styled(Toolbar)(({ theme }) => ({
    padding: '30px 0 10px',
    [theme.breakpoints.up('sm')]: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    [theme.breakpoints.down('mobile')]: {
        padding: '20px 30px',
    },
    [theme.breakpoints.down('middle')]: {
        padding: '20px',
    },
}));

// 購物車 icon
const ShoppingCartLayout = styled('div')(({ theme }) => ({
    fontSize: '1.4em',
    marginRight: '30px',
    cursor: 'pointer',
    '.count': {
        marginLeft: '10px',
    },
}));

/** Navbar */
const NavMenuLayout = styled('nav')(({ theme }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '40px',
    'a': {
        textDecoration: 'none',
        color: theme.palette.textColor,
        margin: '20px',
        padding: theme.spacing(2),
        opacity: .8,
        transition: 'all .5s ease',
        '&:hover': {
            opacity: '1',
        },
    },
    [theme.breakpoints.down('mobile')]: {
        display: 'none',
    },
}));

// mWeb sidenav
const SideNavLayout = styled('div')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('mobile')]: {
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '100',
        '&.active, .mWeb-navbar, a:not(.social-item)': {
            display: 'block',
        },
        '.wrap': {
            backgroundColor: theme.palette.card.main,
            padding: '20px 0',
            position: 'relative',
            zIndex: '1',
        },
        '.sidenav-item': {
            textAlign: 'right',
            padding: '0 30px',
        },
        '.mWeb-navbar': {
            marginLeft: '0',
        },
        'a': {
            fontSize: '1.15em',
            textDecoration: 'none',
            color: theme.palette.textColor,
            margin: '0',
            padding: '20px 70px',
            opacity: '1',
            '&:active': {
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
            },
        },
        '.community': {
            fontSize: '1.4em',
            padding: '12px 70px',
            'a': {
                marginRight: '30px',
                padding: '0',
            },
        },
        '.shopping-cart': {
            fontSize: '1.3em',
            paddingTop: '16px',
            paddingBottom: '16px',
        },
        '.count': {
            marginLeft: '10px',
        },
        '.mask': {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, .65)',
            position: 'absolute',
            top: '0',
            left: '0',
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.sidenav-item': {
            padding: '0 20px',
        },
        'a, .community': {
            padding: '12px 50px',
        },
    },
}));

//
const SideNavIconLayout = styled('span')(({ theme }) => ({
    width: '40px',
    height: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    display: 'inline-block',
    border: `1px solid ${theme.palette.border.light}`,
    borderRadius: '50%',
    opacity: '0.3',
    transition: 'all .5s ease',
    '&:hover, &:active': {
        opacity: '1',
    },
    '&.btn-close': {
        fontSize: '1.4em',
    },
    [theme.breakpoints.down('middle')]: {
        width: '34px',
        height: '34px',
        lineHeight: '34px',
        '&.btn-close': {
            fontSize: '1.2em',
        },
    },
}));

/** Footer */
const FooterLayout = styled('footer')(({ theme }) => ({
    fontSize: '0.9em',
    borderTop: `1px solid ${theme.palette.border.dark}`,
    marginTop: '160px',
    padding: '40px 0',
    '*': {
        color: theme.palette.textColor,
    },
    '.container': {
        alignItems: 'center',
        margin: 'auto',
        border: '1px solid'
    },
    '.grid-right': {
        textAlign: 'right',
    },
    'img': {
        marginRight: '16px',
    },
    '.community': {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    '.social-item': {
        fontSize: '1.8em',
        margin: '0 4px',
        padding: '4px',
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
    [theme.breakpoints.down('mobile')]: {
        marginTop: '40px',
    },
}));

// 語系
const LangOptionLayout = styled('select')(({ theme }) => ({
    fontSize: '1em',
    backgroundColor: theme.palette.card.main,
    border: '0',
    borderRadius: theme.borderRadius,
    marginLeft: '20px',
    padding: '16px 20px',
}));

export {
    AppBarLayout,
    HeaderLayout,
    ShoppingCartLayout,
    NavMenuLayout,
    SideNavLayout,
    SideNavIconLayout,
    FooterLayout,
    LangOptionLayout,
};
