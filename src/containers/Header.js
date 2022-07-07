import { useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import TawkTo from 'tawkto-react';
import { Box, useMediaQuery } from '@mui/material';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';

import { AppBarLayout, HeaderLayout } from './globalLayout';
import Logo from '../components/Logo';
import Navbar from './Navbar';
import SideNavIcon from './SideNavIcon';
import SideNav from './SideNav';

import { GlobalContext } from '../context/global.state';
import Service from '../utils/util.service';
import useLocalStorage from '../utils/useLocalStorage';
import useGoogleAnalytics from '../utils/useGoogleAnalytics';

// dynamic
const Status = dynamic(() => import('./header/Status'));

const arrangeCartList = (array) => array.reduce((acc, obj) => {

    acc[obj.productId] = acc[obj.productId] || {};
    acc[obj.productId].title = obj.title;
    acc[obj.productId].imgUrl = obj.imgUrl;
    acc[obj.productId].price = obj.price;
    return acc;

}, {});

//
const Header = () => {

    useGoogleAnalytics();

    // Context
    const {
        logged,
        targetBox,
        sideNav,
        globalDispatch,
    } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));
    const [cartItem, setCartItem] = useLocalStorage('cartItem');

    // 第三方: Tawk 線上客服
    useEffect(() => {

        const tawk = new TawkTo(
            process.env.NEXT_PUBLIC_TAWKTO_PROPERTYID,
            process.env.NEXT_PUBLIC_TAWKTO_TAWKID
        );
        tawk.showWidget();

    });

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

    // 手機版 sidenav: 點擊
    const handleClickSideNav = () => globalDispatch({ type: 'sidenav', payload: !sideNav });

    return (

        <AppBarLayout>
            <HeaderLayout className="Model-container">
                <Box sx={{ flexGrow: 1 }}>
                    <Logo />
                    <Navbar />
                </Box>

                <Box sx={{
                    display: { xs: 'none', mobile: 'flex' },
                    alignItems: 'center',
                }}>
                    <Status />
                </Box>

                <Box sx={{
                    display: { xs: 'flex', mobile: 'none' }
                }}>
                    <SideNavIcon
                        icon={faThLarge}
                        onClick={handleClickSideNav}
                    />
                </Box>
            </HeaderLayout>

            <SideNav />
        </AppBarLayout>

    );

};

export default Header;
