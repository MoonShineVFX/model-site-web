import { styled } from '@mui/system';
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
    // '&:not(.panel-product)': {
    //     maxWidth: '1000px',
    // },
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
    '.options': {
        display: 'flex',
        margin: '0 -8px',
        '> *': {
            flex: '1',
        },
    },
    'select': {
        fontSize: '0.9em',
        color: theme.palette.textColor,
        backgroundColor: theme.palette.bgColor,
        border: '0',
        borderBottom: `1px solid ${theme.palette.border.dark}`,
        margin: '0 8px',
        padding: '12px 2px',
        opacity: '0.8',
    },
    '.model-button': {
        width: '100%',
        borderRadius: '0',
        marginTop: '24px',
        paddingTop: '4px',
        paddingBottom: '4px',
        position: 'relative',
        zIndex: '1',
    },
}));

// 項目
const ItemLayout = styled('div')(({ theme }) => ({
    lineHeight: '1.4',
    flex: '0 0 calc(100% / 4 - 48px)',
    margin: '0 24px 80px',
    cursor: 'default',
    '.item-content': {
        marginBottom: '20px',
    },
    '.title': {
        fontWeight: 'normal',
        marginBottom: '8px',
    },
    '.file-size': {
        opacity: '0.6',
    },
    '.downloadWrap': {
        padding: '0 20px 0',
    },
    '.options': {
        display: 'flex',
        margin: '0 -8px 20px',
        '> *': {
            flex: '1',
        },
    },
    'select': {
        fontSize: '0.9em',
        color: theme.palette.textColor,
        backgroundColor: theme.palette.bgColor,
        border: '0',
        borderBottom: `1px solid ${theme.palette.border.dark}`,
        margin: '0 8px',
        padding: '12px 2px',
        opacity: '0.8',
    },
    '.btn-download': {
        display: 'block',
    },
    '.model-button.default': {
        marginTop: '0',
        padding: '10px',
    },
    '.disabled': {
        pointerEvents: 'none',
        cursor: 'default',
        '.model-button': {
            color: '#A6A6A6',
            backgroundColor: '#CCC',
        },
    },
}));

// 訂單紀錄
// order/orderLayout.js

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
    ItemLayout,
    BoxWrapLayout,
};
