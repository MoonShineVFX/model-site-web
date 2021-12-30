import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Box from '../Box';
import Links from '../Links';
import deftag from '../../utils/util.deftag';

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

    // Router
    const router = useRouter();

    // 登出行為
    const handleClickMenu = (e) => {

        e.preventDefault();
        Cookies.remove('token');
        router.push('/');

    };

    return (

        <MyAccountLayout>
            {
                Object.keys(menus).map((key) => (

                    <Links
                        key={key}
                        url={`/member/${key}`}
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
