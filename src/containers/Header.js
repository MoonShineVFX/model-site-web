import { styled } from '@mui/system';
import { Toolbar, Box } from '@mui/material';
import { Links, ButtonLink } from '../components/Links';
import Navbar from './Navbar';
import deftag from '../utils/util.deftag';

const { common: { btn_login, logo_text } } = deftag;

const AppBarLayout = styled('header')(({ theme }) => ({
    maxHeight: '90px',
    backgroundColor: theme.palette.bgColor,
    boxShadow: 'none',
}));

const HeaderLayout = styled(Toolbar)(({ theme }) => ({
    padding: `${theme.spacing(3)} 0`,
    [theme.breakpoints.up('sm')]: {
        paddingLeft: 0,
        paddingRight: 0,
    },
}));

const LogoLayout = styled('div')(({ theme }) => ({
    fontSize: '1.9em',
    fontfamily : 'Roboto bold',
    fontWeight: 'bold',
    'a': {
        color: theme.palette.priceColor, // 未來會是真的 logo
        textDecoration: 'none',
    },
}));

//
const Header = () => (

    <AppBarLayout>
        <HeaderLayout className="Model-container">
            <LogoLayout>
                <Links url="/">{logo_text}</Links>
            </LogoLayout>

            <Box sx={{ flexGrow: 1 }}>
                <Navbar />
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                <ButtonLink
                    url="login"
                    text={btn_login}
                />
            </Box>
        </HeaderLayout>
    </AppBarLayout>

);

export default Header;
