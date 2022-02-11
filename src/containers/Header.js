import { useEffect, useContext } from 'react';
import { styled } from '@mui/system';
import { Toolbar, Box } from '@mui/material';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink } from '../components/Links';
import Buttons from '../components/Buttons';
import Logo from '../components/Logo';
import FontIcon from '../components/FontIcon';
import Navbar from './Navbar';
import Cart from '../components/member/Cart';
import MyAccountBox from '../components/member/MyAccountBox';

import { GlobalContext } from '../context/global.state';
import useLocalStorage from '../utils/useLocalStorage';
import deftag from '../utils/util.deftag';
import Service from '../utils/util.service';

const {
    memberSign: { text_signin },
    member: { my_account },
} = deftag;

const arrangeCartList = (array) => array.reduce((acc, obj) => {

    acc[obj.productId] = acc[obj.productId] || {};
    acc[obj.productId].title = obj.title;
    acc[obj.productId].imgUrl = obj.imgUrl;
    acc[obj.productId].price = obj.price;
    return acc;

}, {});

//
const AppBarLayout = styled('header')(({ theme }) => ({
    maxHeight: '90px',
    backgroundColor: theme.palette.bgColor,
    boxShadow: 'none',
}));

//
const HeaderLayout = styled(Toolbar)(({ theme }) => ({
    padding: `${theme.spacing(3)} 0`,
    [theme.breakpoints.up('sm')]: {
        paddingLeft: 0,
        paddingRight: 0,
    },
}));

// 購物車 icon
const ShoppingCartLayout = styled('div')(({ theme }) => ({
    fontSize: '1.4em',
    marginRight: '30px',
    cursor: 'pointer',
    '.count': {
        marginLeft: '10px',
    },
}));

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
        cart,
        globalDispatch,
    } = useContext(GlobalContext);

    const [cartItem, setCartItem] = useLocalStorage('cartItem');

    useEffect(() => {

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

    }, [logged, globalDispatch]);

    const handleClickBox = (type) => {

        globalDispatch({
            type: 'target_box',
            payload: (type !== targetBox) ? type : '',
        });

    };

    return (

        <AppBarLayout>
            <HeaderLayout className="Model-container">
                <Logo />

                <Box sx={{ flexGrow: 1 }}>
                    <Navbar />
                </Box>

                <Box sx={{
                    display: { xs: 'flex', md: 'flex' },
                    alignItems: 'center',
                    position: 'relative',
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
            </HeaderLayout>
        </AppBarLayout>

    );

};

export default Header;
