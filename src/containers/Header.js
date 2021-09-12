import { styled } from '@mui/system';
import { AppBar, Toolbar, Box } from '@mui/material';
import { Links, ButtonLink } from '../components/Links';
import Navbar from './Navbar';

const AppBarBase = styled(AppBar, {
    name: 'header-appbar',
})(({ theme }) => ({
    maxHeight: '90px',
    borderBottom: `1px solid ${theme.palette.border.main}`, // debug
    backgroundColor: theme.palette.bgColor,
    boxShadow: 'none',
}));

const HeaderBase = styled(Toolbar)(({ theme }) => ({
    padding: `${theme.spacing(3)} 0`,
}));

//
const Header = () => (

    <AppBarBase position="fixed">
        <HeaderBase className="Model-container">
            <Links>
                <img
                    src="//fakeimg.pl/200x60/?text=MoonSin Market"
                    alt="夢想模型"
                />
            </Links>

            <Box sx={{ flexGrow: 1 }}>
                <Navbar />
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                <ButtonLink
                    url="login"
                    text="登入"
                />
            </Box>
        </HeaderBase>
    </AppBarBase>

);

export default Header;
