import { styled } from '@mui/system';
import Links from '../Links';
import { BoxWrapLayout } from '../member/accountLayout';

// 訂單紀錄
const OrderRecordLayout = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.border.dark}`,
    '.item-row': {
        display: 'flex',
        '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.border.dark}`,
        },
    },
    '.item-cell': {
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 8px',
        '&:not(:last-child)': {
            borderRight: `1px solid ${theme.palette.border.dark}`,
        },
        '&.cell-80': {
            maxWidth: '80px',
        },
        '&.cell-140': {
            maxWidth: '140px',
        },
        '&.cell-160': {
            maxWidth: '160px',
        },
        '&.cell-180': {
            maxWidth: '180px',
        },
    },
    '.orderNumber': {
        color: theme.palette.textColor,
        display: 'inline-block',
    },
}));

// 訂單詳細
const OrderDetailLayout = styled(BoxWrapLayout)(({ theme }) => ({
    position: 'relative',
    '.info': {
        borderBottom: `1px dashed ${theme.palette.border.dark}`,
        marginBottom: '40px',
        '.row': {
            marginBottom: '20px',
        },
    },
    '.title': {
        fontSize: '0.9em',
        fontWeight: 'normal',
        marginBottom: '4px',
    },
}));

// 購買商品
const ItemWrapLayout = styled(Links)(({ theme }) => ({
    color: theme.palette.textColor,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
        marginBottom: '20px',
    },
    '.thumb': {
        width: '160px',
        height: '93px',
        borderRadius: '10px',
        marginRight: '20px',
        overflow: 'hidden',
        border: '1px solid',
    },
    '.content': {
        flex: '0 0 calc(100% - 160px - 20px)',
    },
    '.title': {
        fontWeight: 'normal',
        margin: '0',
    },
}));

export {
    OrderRecordLayout,
    OrderDetailLayout,
    ItemWrapLayout,
};
