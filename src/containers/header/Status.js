import { Fragment, useEffect, useContext } from 'react';
import { useMediaQuery } from '@mui/material';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { ShoppingCartLayout } from '../globalLayout';
import { ButtonLink } from '../../components/Links';
import Buttons from '../../components/Buttons';
import FontIcon from '../../components/FontIcon';
import MyAccountBox from '../../components/member/MyAccountBox';

import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';
import useLocalStorage from '../../utils/useLocalStorage';

const arrangeCartList = (array) => array.reduce((acc, obj) => {

    acc[obj.productId] = acc[obj.productId] || {};
    acc[obj.productId].title = obj.title;
    acc[obj.productId].imgUrl = obj.imgUrl;
    acc[obj.productId].price = obj.price;
    return acc;

}, {});

//
const Status = () => {

    // Context
    const {
        deftags,
        logged,
        targetBox,
        cart,
        globalDispatch,
    } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));
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

    // 購物車與我的帳號 box
    const handleClickBox = (type) => {

        globalDispatch({
            type: 'target_box',
            payload: (type !== targetBox) ? type : '',
        });

    };

    return (

        <Fragment>
            <ShoppingCartLayout
                url={`/${logged ? 'cart' : 'signin'}`}
                data-device={matches ? 'mobile' : 'desktop'}
            >
                <FontIcon icon={faShoppingCart} />
                <span className="count">({cart.count})</span>
            </ShoppingCartLayout>

            {
                logged ? (

                    <Buttons
                        text={deftags.member_my_account}
                        variant="outlined"
                        onClick={() => handleClickBox('myAccount')}
                    />

                ) : (

                    <ButtonLink
                        url="/signin"
                        text={deftags.text_signin}
                    />

                )
            }

            {(targetBox === 'myAccount') && <MyAccountBox />}
        </Fragment>

    );

};

export default Status;
