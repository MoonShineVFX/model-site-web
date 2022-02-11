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
    member: {
        text_member_center,
        text_logout,
    },
} = deftag;

// 菜單
const menus = {
    account: text_member_center,
    logout: text_logout,
};

//
const MyAccountLayout = styled(Box)(({ theme }) => ({
    minWidth: '150px',
    top: '60px',
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
const MyAccount = () => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // 登出行為
    const handleClickMenu = (e) => {

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
                        {...(key === 'logout') && { onClick: handleClickMenu }}
                    >
                        {menus[key]}
                    </Links>

                ))
            }
        </MyAccountLayout>

    );

};

export default MyAccount;
