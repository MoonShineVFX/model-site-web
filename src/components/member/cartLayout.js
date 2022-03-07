import { styled } from '@mui/system';
import Links from '../Links';

// 外層 form
//
const TitleLayout = styled('h1')(({ theme }) => ({
    textAlign: 'center',
    marginBottom: '100px',
    [theme.breakpoints.down('mobile')]: {
        marginBottom: '60px',
    },
    [theme.breakpoints.down('middle')]: {
        marginBottom: '40px',
    },
}));

//
const SectionLayout = styled('section')(({ theme }) => ({
    maxWidth: '760px',
    margin: '0 auto',
    '.title-large': {
        fontSize: '1.25em',
        fontWeight: 'normal',
        marginBottom: '30px',
        opacity: '0.8',
    },
    '.btn-action': {
        textAlign: 'center',
        'p': {
            marginTop: '20px',
            opacity: '0.6',
        },
    },
    '.model-button': {
        width: '100%',
        maxWidth: '480px',
        fontSize: '1.25em',
        borderRadius: '40px',
        margin: '40px auto 0',
        padding: '16px 10px',
    },
    '.right': {
        '> *:nth-of-type(2)': {
            textAlign: 'right',
        },
    },
}));

// 購物車
const CartLayout = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    padding: '40px 30px',
    '.item-cell': {
        display: 'flex',
        alignItems: 'center',
        '> *': {
            flex: '1',
        },
    },
    [theme.breakpoints.down('sm')]: {
        padding: '20px',
    },
}));

// 商品
const ItemLayout = styled(Links)(({ theme }) => ({
    color: theme.palette.textColor,
    textDecoration: 'none',
    display: 'flex',
    marginBottom: '30px',
    '.thumb': {
        maxWidth: '103px',
        height: '66px',
        borderRadius: '10px',
        marginRight: '20px',
        overflow: 'hidden',
    },
    '.info': {
        width: 'calc(100% - 103px)',
        fontSize: '0.9em',
        '> *:not(.title)': {
            opacity: '0.6',
        },
    },
    '.title': {
        fontSize: '1.2em',
        margin: '0',
        WebkitLineClamp: theme.lineClamp(1),
    },
    '.action': {
        'span': {
            fontSize: '1.2em',
            color: '#ce5151',
            padding: '4px',
        },
    },
    '.amount': {
        fontSize: '1.25em',
        '.price': {
            paddingRight: 'calc((32px / 2) - 4px)', // 刪除按鈕的寬度一半 + padding
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.thumb': {
            marginRight: '10px',
        },
        '.amount': {
            fontSize: '1em',
        },
    },
}));

export {
    TitleLayout,
    SectionLayout,
    CartLayout,
    ItemLayout,
};
