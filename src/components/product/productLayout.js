import { styled } from '@mui/system';
import { Grid, ListItemButton } from '@mui/material';
import { ItemNewArrivalLayout } from '../home/homeLayout';

//
const GridLayout = styled(Grid)(({ theme }) => ({
    paddingTop: '60px',
    '.MuiGrid-root': {
        '&.productList': {
            paddingTop: 0,
        },
        '&.tagsList': {
            paddingTop: '118px',
        },
    },
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
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
        opacity: 1,
    },
    '&:hover&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
    },
    '.MuiListItemText-root': {
        margin: 0,
    },
    '.checked': {
        minWidth: 'auto',
        color: theme.palette.textColor,
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
//
const ItemRelativeProductsLayout = styled(ItemNewArrivalLayout)({

});

export {
    GridLayout,
    ListTitleLayout,
    ListItemLayout,
    ItemWrapLayout,
    ItemRelativeProductsLayout,
};
