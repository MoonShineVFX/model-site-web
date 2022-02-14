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
    [theme.breakpoints.down('md')]: {
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
            opacity: 1,
        },
    },
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

// mWeb sidenav
const SideNavLayout = styled('div')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.card.main,
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '100',
        '&.active, .mWeb-navbar, a:not(.social-item)': {
            display: 'block',
        },
        '.sidenav-item': {
            textAlign: 'right',
            padding: '30px',
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
        '.mask': {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, .65)',
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
}));

/** Footer */
const FooterLayout = styled('footer')(({ theme }) => ({
    textAlign: 'center',
    marginTop: '100px',
    marginBottom: '40px',
    '*': {
        color: theme.palette.textColor,
    },
    '.social-item': {
        fontSize: '1.8em',
        margin: theme.spacing(0, 3),
        padding: theme.spacing(1),
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
}));

export {
    AppBarLayout,
    HeaderLayout,
    ShoppingCartLayout,
    NavMenuLayout,
    SideNavLayout,
    SideNavIconLayout,
    FooterLayout,
};
