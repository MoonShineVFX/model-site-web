import { useContext } from 'react';
import { styled } from '@mui/system';
import Cookies from 'js-cookie';
import Box from '../Box';
import Links from '../Links';
import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';

const { redirectTo } = util;
const {
    common: { text_logout },
    member: {
        member_account_center,
    },
} = deftag;

// Menu
const menus = {
    account: member_account_center,
    logout: text_logout,
};

//
const MyAccountLayout = styled(Box)(({ theme }) => ({
    minWidth: '150px',
    top: '100px',
    right: '30px',
    '.menu-item': {
        lineHeight: '1',
        color: theme.palette.textColor,
        textDecoration: 'none',
        display: 'block',
        padding: '20px 30px',
        ':not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.bgColor}`,
        },
    },
}));

//
const MyAccountBox = () => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // 當頁再次點擊要關閉 box
    const handleClickAccount = () => globalDispatch({ type: 'target_box', payload: '' });

    // 登出
    const handleClickLogout = (e) => {

        e.preventDefault();
        Cookies.remove('token');
        globalDispatch({ type: 'target_box', payload: '' });
        localStorage.removeItem('cartItem'); // 清除暫存購物車
        redirectTo();

    };

    return (

        <MyAccountLayout>
            {
                Object.keys(menus).map((key) => (

                    <Links
                        key={key}
                        url={(key === 'logout') ? '#' : `/member/${key}`}
                        title={menus[key]}
                        className="menu-item"
                        onClick={key === 'logout' ? handleClickLogout : handleClickAccount}
                    >
                        {menus[key]}
                    </Links>

                ))
            }
        </MyAccountLayout>

    );

};

export default MyAccountBox;
