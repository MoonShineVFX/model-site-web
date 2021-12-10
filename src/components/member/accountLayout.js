import { styled } from '@mui/system';
import { Tabs, Tab } from '@mui/material';
import Links from '../Links';

// Tab
const TabWrapLayout = styled('section')(({ theme }) => ({
    '.MuiTabs-indicator': {
        display: 'none',
    },
    '.tab-menu': {
        // border: '1px solid #FFF',
        justifyContent: 'center',
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
    '.second-title': {
        margin: '80px 0',
    },
}));

//
const TabPanelLayout = styled('div')({
    maxWidth: '900px',
    margin: 'auto',
    border: '1px solid #FFF',
});

// 我的模型庫
const OrderRecordLayout = styled('div')(({ theme }) => ({
    // minWidth: '150px',
    // top: '60px',
    // right: '30px',
    // '.menu-item': {
    //     lineHeight: '1',
    //     color: theme.palette.textColor,
    //     textDecoration: 'none',
    //     display: 'block',
    //     padding: '20px 30px',
    //     ':not(:last-child)': {
    //         borderBottom: `1px solid ${theme.palette.bgColor}`,
    //     },
    // },
}));

// 訂單紀錄
// 修改會員資料

export {
    TabWrapLayout,
    TabPanelLayout,
    OrderRecordLayout,
};
