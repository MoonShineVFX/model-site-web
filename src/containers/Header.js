import { useEffect, useContext } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { faShoppingCart, faThLarge } from '@fortawesome/free-solid-svg-icons';

import {
    AppBarLayout,
    HeaderLayout,
    ShoppingCartLayout,
} from './globalLayout';
import { ButtonLink } from '../components/Links';
import Buttons from '../components/Buttons';
import Logo from '../components/Logo';
import FontIcon from '../components/FontIcon';
import Navbar from './Navbar';
import SideNavIcon from './SideNavIcon';
import Cart from '../components/member/Cart';
import MyAccountBox from '../components/member/MyAccountBox';
import SideNav from './SideNav';

import { GlobalContext } from '../context/global.state';
import useLocalStorage from '../utils/useLocalStorage';
import deftag from '../utils/util.deftag';
import Service from '../utils/util.service';

const {
    memberSign: { text_signin },
    member: { member_my_account },
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

    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));
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
                    <ShoppingCartLayout
                        onClick={() => handleClickBox('cartList')}
                    >
                        <FontIcon icon={faShoppingCart} />
                        <span className="count">({cart.count})</span>
                    </ShoppingCartLayout>

                    {
                        logged ? (

                            <Buttons
                                text={member_my_account}
                                variant="outlined"
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
