import { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/system';
import { Toolbar, Box } from '@mui/material';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ButtonLink } from '../components/Links';
import Buttons from '../components/Buttons';
import Logo from '../components/Logo';
import FontIcon from '../components/FontIcon';
import Cart from '../components/member/Cart';
import Navbar from './Navbar';

import { GlobalContext } from '../context/global.state';
import useLocalStorage from '../utils/useLocalStorage';
import deftag from '../utils/util.deftag';

const {
    memberSign: { text_signin },
    member: { my_account },
} = deftag;

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

//
const Header = () => {

    // Context
    const {
        logged,
        cartCount,
        targetBox,
        globalDispatch,
    } = useContext(GlobalContext);

    // State
    const [cartItem, setCartItem] = useLocalStorage('cartItem');
    const [target, setTarget] = useState('');

    useEffect(() => {

        globalDispatch({
            type: 'add_cart',
            payload: Object.entries(cartItem || {}).length,
        });

    }, [cartItem, globalDispatch]);

    const handleClickBox = (type) => {

        setTarget(type);
        globalDispatch({
            type: 'target_box',
            payload: type,
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
                        <span className="count">({cartCount})</span>
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

                    {
                        // 購物車
                        targetBox[target] &&
                            ((target === 'cartList') ? <Cart /> : 'my account')
                    }
                </Box>
            </HeaderLayout>
        </AppBarLayout>

    );

};

export default Header;
