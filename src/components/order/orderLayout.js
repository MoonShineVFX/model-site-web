import { styled } from '@mui/system';
import Box from '../Box';
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
    '.cell-orderNumber': {
        color: theme.palette.textColor,
    },
}));

// 訂單詳細
const OrderDetailLayout = styled(BoxWrapLayout)(({ theme }) => ({
    position: 'relative',
    '.title': {
        fontSize: '0.9em',
        fontWeight: 'normal',
    },
    // color: theme.palette.secondary.contrastText,
}));

export {
    OrderRecordLayout,
    OrderDetailLayout,
};
