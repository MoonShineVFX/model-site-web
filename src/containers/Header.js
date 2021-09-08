import { styled, alpha } from '@mui/system';
import {
    AppBar,
    Toolbar,
    Box,
} from '@mui/material';

import LinkText from '../components/LinkText';

const HeaderBase = styled(Toolbar)(() => ({
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
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

    <AppBar position="fixed">
        <HeaderBase>
            <img
                src="//fakeimg.pl/200x40/?text=MoonSin Market"
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
    </AppBar>

);

export default Header;
