import { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/system';
import { Toolbar, Box } from '@mui/material';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ButtonLink } from '../components/Links';
import Buttons from '../components/Buttons';
import Logo from '../components/Logo';
import FontIcon from '../components/FontIcon';
import Cart from '../components/product/Cart';
import Navbar from './Navbar';

import { GlobalContext } from '../context/global.state';
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
        visible,
        currEvent,
        logged,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // State
    const [items, setItems] = useState({});

    useEffect(() => {

        setItems(JSON.parse(localStorage.getItem('cartItem')));

    }, []);

    const handleClickBox = (type = 'myAccount') => {

        lightboxDispatch({ type: 'SHOW', currEvent: type });

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
                        <span className="count">({Object.entries(items).length})</span>
                    </ShoppingCartLayout>

                    {
                        logged ? (

                            <Buttons
                                text={my_account}
                                onClick={handleClickBox}
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
                        visible &&
                            ((currEvent === 'cartList') ? <Cart /> : 'my account')
                    }
                </Box>
            </HeaderLayout>
        </AppBarLayout>

    );

};

export default Header;
