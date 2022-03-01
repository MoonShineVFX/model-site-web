import { styled } from '@mui/system';
import Box from '../Box';

// Tab
const TabWrapLayout = styled('section')(({ theme }) => ({
    '.MuiTabs-indicator': {
        display: 'none',
    },
    '.tab-menu': {
        maxWidth: '60%',
        margin: 'auto',
        'button': {
            fontSize: '1em',
            color: theme.palette.textColor,
            margin: '0 20px',
            padding: '0',
            flex: '1',
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
    [theme.breakpoints.down('mobile')]: {
        '.tab-menu': {
            maxWidth: '100%',
        },
        '.second-title': {
            fontSize: '1.3em',
            margin: '40px 0 20px',
        },
        '.download-notice': {
            fontSize: '0.8em',
            margin: '20px 0',
            opacity: '0.6',
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.tab-menu': {
            fontSize: '0.9em',
            'button': {
                margin: '0',
            },
        },
    },
}));

// 我的模型庫
const ItemLayout = styled('div')(({ theme }) => ({
    lineHeight: '1.4',
    cursor: 'default',
    '.item-thumb': {
        height: '153px',
        borderRadius: '0',
        display: 'block',
        'img': {
            width: '100%',
            height: '100%',
        },
    },
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
        padding: '0 20px',
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
    '.model-button': {
        width: '100%',
        borderRadius: '0',
        marginTop: '24px',
        paddingTop: '4px',
        paddingBottom: '4px',
        position: 'relative',
        zIndex: '1',
        '&.default': {
            marginTop: '0',
            padding: '10px',
        },
    },
    '.disabled': {
        pointerEvents: 'none',
        cursor: 'default',
        '.model-button': {
            color: '#A6A6A6',
            backgroundColor: '#CCC',
        },
    },
    [theme.breakpoints.down('middle')]: {
        borderRadius: '10px',
        overflow: 'hidden',
        '.item-thumb': {
            height: '173px',
        },
        '.item-content': {
            fontSize: '0.9em',
            backgroundColor: theme.palette.card.main,
            marginBottom: '0',
            padding: '12px 16px',
        },
        '.title': {
            margin: '0',
        },
    },
}));

// 訂單紀錄 && 詳細頁
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
    [theme.breakpoints.down('sm')]: {
        fontSize: '1em',
        padding: '30px 20px',
        '.row:not(:last-child), .form-row:not(.Model-form-button)': {
            marginBottom: '20px',
        },
        '.title': {
            marginBottom: '8px',
        },
    },
}));

export {
    TabWrapLayout,
    ItemLayout,
    BoxWrapLayout,
};
