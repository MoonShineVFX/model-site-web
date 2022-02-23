import { styled } from '@mui/system';
import { GlobalStyles, Grid, ListItemButton } from '@mui/material';
import ItemsWrap from '../ItemsWrap';

const detailStyles = {
    '.Model-container': {
        padding: '0',
    },
};

// Detail Style
const productDetailStyles = <GlobalStyles styles={detailStyles} />;

//
const GridLayout = styled(Grid)(({ theme }) => ({
    paddingTop: '60px',
    '.productList': {
        '.MuiButtonBase-root': {
            fontSize: '1.15em',
            color: theme.palette.textColor,
            opacity: 0.6,
            '&:hover': {
                opacity: 1,
            },
        },
        '.Mui-selected': {
            opacity: 1,
        },
        '.MuiTabs-indicator': {
            backgroundColor: 'transparent',
        },
        '.no-product': {
            textAlign: 'center',
        },
    },
    '.tab-menu': {
        marginBottom: '70px',
        '.MuiTabs-flexContainer': {
            justifyContent: 'center',
        },
    },
}));

//
const ListTitleLayout = styled('h4')(({ theme }) => ({
    fontWeight: 'normal',
    margin: 0,
    '&:after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '1px',
        backgroundColor: theme.palette.textColor,
        marginTop: '12px',
        marginBottom: '12px',
        opacity: 0.16,
    },
}));

//
const ListItemLayout = styled(ListItemButton)(({ theme }) => ({
    marginBottom: '10px',
    opacity: .8,
    transition: 'all .5s ease',
    '&:hover': {
        opacity: 1,
    },
    '&.Mui-selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
        opacity: 1,
    },
    '&:hover&.Mui-selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
    },
    '.MuiListItemText-root': {
        margin: 0,
    },
    '.checked': {
        minWidth: 'auto',
        color: theme.palette.primary.contrastText,
    },
}));

//
const ItemWrapLayout = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -8px 0',
    '.item': {
        flex: '0 0 calc(100% / 3)',
        padding: '0 8px',
        [theme.breakpoints.down('lg')]: {
            flex: '0 0 calc(100% / 2)',
        },
        '&:nth-of-type(3n)': {
            marginRight: 0,
        },
    },
}));

/** Detail */
const DetailWrapLayout = styled('section')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
    '.detail-banner': {
        height: '396px',
    },
    [theme.breakpoints.down('mobile')]: {
        borderRadius: '0',
    },
}));

//
const DetailContentLayout = styled(Grid)(({ theme }) => ({
    fontSize: '1.15em',
    padding: '48px 60px',
    'p': {
        margin: '0 0 30px',
    },
    '.tag': {
        fontSize: '0.8em',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
        marginRight: '16px',
        padding: '6px 8px',
    },
    '.title': {
        fontSize: '1.8em',
        fontWeight: 'normal',
        margin: '10px 0',
    },
    '.description': {
        lineHeight: '2',
    },
    '.label, .notice': {
        opacity: '0.7',
    },
    '.notice': {
        fontSize: '0.85em',
        marginBottom: '0',
    },
    '.price': {
        fontSize: '1.2em',
        color: theme.palette.primary.main,
        margin: '0 0 20px',
    },
    '.model-button': {
        width: '100%',
    },
    '.other-info': {
        marginTop: '40px',
    },
    '.other-info-item': {
        display: 'flex',
        '.label': {
            maxWidth: '120px',
            flex: '1',
        },
        'p': {
            marginBottom: '20px',
        },
    },
    [theme.breakpoints.up('mobile')]: {
        '.grid-right': {
            paddingLeft: '80px',
        },
        '.title': {
            fontSize: '2.1em',
        },
        '.price': {
            fontSize: '1.45em',
            textAlign: 'center',
        },
        '.other-info-item': {
            display: 'block',
        },
    },
    [theme.breakpoints.down('mobile')]: {
        padding: '30px',
    },
    [theme.breakpoints.down('middle')]: {
        fontSize: '1em',
        padding: '20px',
        '.title': {
            fontSize: '1.4em',
            marginBottom: '10px',
        },
        '.price': {
            fontSize: '1.1em',
        },
        '.other-info': {
            marginTop: '20px',
        },
    },
}));

//
const FormatAndRenderLayout = styled('ul')(({ theme }) => ({
    margin: '0',
    paddingInlineStart: '20px',
    '.item': {
        margin: '10px 0',
        '.title': {
            fontSize: '1em',
            margin: '0',
        },
    },
    '.renders': {
        fontSize: '0.9em',
    },
}));

//
const DemoImageWrapLayout = styled(ItemsWrap)(({ theme }) => ({
    margin: '40px 0',
    [theme.breakpoints.up('mobile')]: {
        margin: '80px 0 100px',
    },
}));

//
const DemoImageLayout = styled('div')(({ theme }) => ({
    height: '317px',
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
    cursor: 'pointer',
}));

export {
    productDetailStyles,
    GridLayout,
    ListTitleLayout,
    ListItemLayout,
    ItemWrapLayout,
    DetailWrapLayout,
    DetailContentLayout,
    FormatAndRenderLayout,
    DemoImageWrapLayout,
    DemoImageLayout,
};
