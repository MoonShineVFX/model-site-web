import { styled } from '@mui/system';
import { Tabs, Tab, Popover } from '@mui/material';
import Popup from '../Popup';
import Links from '../Links';

// Tab
const TabWrapLayout = styled('section')(({ theme }) => ({
    '.MuiTabs-indicator': {
        display: 'none',
    },
    '.tab-menu': {
        'button': {
            fontSize: '1em',
            color: theme.palette.textColor,
            padding: '16px 40px',
            margin: '0 40px',
            opacity: '0.6',
            '&.Mui-selected': {
                opacity: '1',
            },
        },
    },
    '.MuiTabs-flexContainer': {
        justifyContent: 'center',
    },
    '.second-title': {
        fontWeight: 'normal',
        margin: '80px 0',
    },
}));

//
const TabPanelLayout = styled('div')({
    maxWidth: '1000px',
    margin: 'auto',
});

// 我的模型庫

// 訂單紀錄
const OrderRecordLayout = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.border.dark}`,
    '.row-head': {

    },
    '.item-row': {
        display: 'flex',
        '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.border.dark}`,
        },
        '&:not(.row-head) .cell-quantity': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    },
    '.item-cell': {
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 20px',
        '&:not(:last-child)': {
            borderRight: `1px solid ${theme.palette.border.dark}`,
        },
        '&.cell-80': {
            maxWidth: '80px',
        },
        '&.cell-140': {
            maxWidth: '140px',
        },
    },
}));

// Popover
const PopoverLayout = styled(Popup)(({ theme }) => ({
    '.MuiPaper-root': {
        padding: '0 16px',
    },
    '.item': {
        color: theme.palette.secondary.contrastText,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '16px 20px',
        '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.border.dark}`,
        },
    },
    '.title': {
        maxWidth: '200px',
        width: '100%',
    },
    '.price': {
        fontWeight: 'normal',
        flex: '0 0 calc(100% - 200px - 20px)',
        marginLeft: '20px',
    },
}));

// 修改會員資料

export {
    TabWrapLayout,
    TabPanelLayout,
    OrderRecordLayout,
    PopoverLayout,
};
