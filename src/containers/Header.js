import { styled, alpha } from '@mui/system';
import {
    AppBar,
    Toolbar,
    Box,
} from '@mui/material';

import LinkText from '../components/LinkText';

const AppBarBase = styled(AppBar, {
    name: 'header-appbar',
})(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.border.main}`, // debug
    backgroundColor: theme.palette.bgColor,
    boxShadow: 'none',
}));

const HeaderBase = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
    padding: `${theme.spacing(3)} 0`,
}));

const LinkTextBase = styled('div', {
    name: 'header-button-link',
})(() => ({
    marginLeft: '40px',
    '& a': {
        color: 'white',
    },
}));

//
const Header = () => (

    <AppBarBase position="fixed">
        <HeaderBase>
            <img
                src="//fakeimg.pl/200x60/?text=MoonSin Market"
                alt="夢想模型"
            />

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                <LinkTextBase>
                    <LinkText
                        url="login"
                        text="登入"
                    />
                </LinkTextBase>
            </Box>
        </HeaderBase>
    </AppBarBase>

);

export default Header;
