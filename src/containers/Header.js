import { useEffect } from 'react';
import { styled } from '@mui/system';
import { Toolbar, Box } from '@mui/material';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ButtonLink } from '../components/Links';
import Logo from '../components/Logo';
import FontIcon from '../components/FontIcon';
import Navbar from './Navbar';
import deftag from '../utils/util.deftag';

const {
    memberSign: { text_signin },
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

    // useEffect(() => {

    //     localStorage.getItem('cartItem');

    // }, []);

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
                }}>
                    <ShoppingCartLayout>
                        <FontIcon icon={faShoppingCart} />
                        <span className="count">({0})</span>
                    </ShoppingCartLayout>

                    <ButtonLink
                        url="signin"
                        text={text_signin}
                    />
                </Box>
            </HeaderLayout>
        </AppBarLayout>

    );

};

export default Header;
