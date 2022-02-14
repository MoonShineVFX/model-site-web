import { useEffect, useContext } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { faShoppingCart, faThLarge, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

import {
    AppBarLayout,
    HeaderLayout,
    ShoppingCartLayout,
    SideNavLayout,
    SideNavIconLayout,
} from './globalLayout';

import Links, { ButtonLink } from '../components/Links';
import Buttons from '../components/Buttons';
import Logo from '../components/Logo';
import FontIcon from '../components/FontIcon';
import Navbar from './Navbar';
import Community from '../components/Community';
import Cart from '../components/member/Cart';
import MyAccountBox from '../components/member/MyAccountBox';

import { GlobalContext } from '../context/global.state';
import useLocalStorage from '../utils/useLocalStorage';
import util from '../utils/util';
import deftag from '../utils/util.deftag';
import Service from '../utils/util.service';

const { redirectTo } = util;
const {
    memberSign: { text_signin },
    member: { my_account, text_logout },
} = deftag;

const arrangeCartList = (array) => array.reduce((acc, obj) => {

    acc[obj.productId] = acc[obj.productId] || {};
    acc[obj.productId].title = obj.title;
    acc[obj.productId].imgUrl = obj.imgUrl;
    acc[obj.productId].price = obj.price;
    return acc;

}, {});

// 購物車 || 我的帳號
const renderBoxComp = (type) => {

    switch (type) {
        case 'cartList':
            return <Cart />;

        case 'myAccount':
            return <MyAccountBox />;

        default:
            return null;
    }

};

const SideNavIcon = ({ className, onClick, icon }) => (

    <SideNavIconLayout
        className={className}
        onClick={onClick}
    >
        <FontIcon icon={icon} />
    </SideNavIconLayout>

);

//
const Header = () => {

    // Context
    const {
        logged,
        targetBox,
        sideNav,
        cart,
        globalDispatch,
    } = useContext(GlobalContext);

    const matches = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [cartItem, setCartItem] = useLocalStorage('cartItem');

    useEffect(() => {

        // 手機版側邊欄
        if (!matches) globalDispatch({ type: 'sidenav', payload: false });
        document.body.style.overflow = sideNav ? 'hidden' : '';

        // 有登入並更新當前登入者的購物車
        if (logged) {

            Service.cartList()
                .then(({ list }) => {

                    setCartItem(arrangeCartList(list));
                    globalDispatch({
                        type: 'cart_list',
                        payload: {
                            count: list.length,
                            items: arrangeCartList(list),
                        },
                    });

                });

        }

        globalDispatch({
            type: 'cart_list',
            payload: {
                count: Object.entries(cartItem || {}).length,
                items: cartItem ?? {},
            },
        });

    }, [logged, globalDispatch, sideNav]);

    // 購物車與我的帳號 box
    const handleClickBox = (type) => {

        globalDispatch({
            type: 'target_box',
            payload: (type !== targetBox) ? type : '',
        });

    };

    // 手機版 sidenav: 關閉
    const handleHideSideNav = () => globalDispatch({ type: 'sidenav', payload: false });

    // 手機版 sidenav: 點擊
    const handleClickSideNav = () => globalDispatch({ type: 'sidenav', payload: !sideNav });

    // 登出
    const handleClickLogout = (e) => {

        e.preventDefault();
        Cookies.remove('token');
        globalDispatch({ type: 'target_box', payload: '' });
        localStorage.removeItem('cartItem'); // 清除暫存購物車
        redirectTo();

    };

    return (

        <AppBarLayout>
            <HeaderLayout className="Model-container">
                <Box sx={{ flexGrow: 1 }}>
                    <Logo />
                    <Navbar />
                </Box>

                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                }}>
                    <ShoppingCartLayout
                        onClick={() => handleClickBox('cartList')}
                    >
                        <FontIcon icon={faShoppingCart} />
                        <span className="count">({cart.count})</span>
                    </ShoppingCartLayout>

                    {
                        logged ? (

                            <Buttons
                                text={my_account}
                                onClick={() => handleClickBox('myAccount')}
                            />

                        ) : (

                            <ButtonLink
                                url="/signin"
                                text={text_signin}
                            />

                        )
                    }

                    {renderBoxComp(targetBox)}
                </Box>

                <Box sx={{
                    display: { xs: 'flex', md: 'none' }
                }}>
                    <SideNavIcon
                        icon={faThLarge}
                        onClick={handleClickSideNav}
                    />
                </Box>
            </HeaderLayout>

            <SideNavLayout className={sideNav ? 'active' : ''}>
                <div className="sidenav-item">
                    <SideNavIcon
                        className="btn-close"
                        icon={faTimes}
                        onClick={handleHideSideNav}
                    />
                </div>

                <Links url={logged ? '/member/account' : '/signin'}>
                    {logged ? my_account : text_signin}
                </Links>

                <Navbar className="mWeb-navbar" />

                {
                    logged &&
                        <Links
                            url="#"
                            onClick={handleClickLogout}
                        >
                            {text_logout}
                        </Links>
                }

                <Community />
                {/* <div className="mask" onClick={handleHideSideNav}></div> */}
            </SideNavLayout>
        </AppBarLayout>

    );

};

export default Header;
