import { styled } from '@mui/system';
import { Tabs, Tab, Popover } from '@mui/material';
import Popup from '../Popup';
import Links from '../Links';
import Box from '../Box';
import { ItemWrapLayout } from '../product/productLayout';

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
        fontSize: '1.9em',
        fontWeight: 'normal',
        margin: '80px 0',
    },
}));

//
const TabPanelLayout = styled('div')({
    margin: 'auto',
    '&:not(.panel-product)': {
        maxWidth: '1000px',
    },
});

// 我的模型庫
const MyProductItemLayout = styled(ItemWrapLayout)(({ theme }) => ({
    margin: '0 -24px 0',
    '.item.style-product': {
        flex: '0 0 calc(100% / 4)',
        marginBottom: '40px',
        padding: '0 24px',
        '.item-thumb': {
            height: '153px',
            borderRadius: '0',
        },
    },
    '.downloadWrap': {
        padding: '0 20px 0',
    },
    'select': {
        fontSize: '0.8em',
        color: theme.palette.textColor,
        backgroundColor: 'transparent',
        border: '0',
        borderBottom: `1px solid ${theme.palette.border.dark}`,
        padding: '4px',
        opacity: '0.8',
    },
    '.model-button': {
        width: '100%',
        borderRadius: '0',
        marginTop: '24px',
        paddingTop: '4px',
        paddingBottom: '4px',
    },
}));

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
        '&:not(.row-head) .cell-orderNumber': {
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
const BoxWrapLayout = styled(Box)(({ theme }) => ({
    maxWidth: '560px',
    fontSize: '1.25em',
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    margin: 'auto',
    padding: '50px 40px',
    position: 'relative',
    top: 'initial',
    '.row': {
        lineHeight: '1.4',
        '&:not(:last-child)': {
            marginBottom: '50px',
        },
    },
    '.title': {
        fontWeight: 'normal',
        margin: '0 0 16px',
        opacity: '0.65',
    },
    '.form-row:not(.Model-form-button)': {
        marginBottom: '30px',
    },
}));

export {
    TabWrapLayout,
    TabPanelLayout,
    MyProductItemLayout,
    OrderRecordLayout,
    PopoverLayout,
    BoxWrapLayout,
};
