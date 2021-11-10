import { styled } from '@mui/system';
import { Toolbar, Box } from '@mui/material';
import { ButtonLink } from '../components/Links';
import Logo from '../components/Logo';
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

//
const Header = () => (

    <AppBarLayout>
        <HeaderLayout className="Model-container">
            <Logo />

            <Box sx={{ flexGrow: 1 }}>
                <Navbar />
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                <ButtonLink
                    url="signin"
                    text={text_signin}
                />
            </Box>
        </HeaderLayout>
    </AppBarLayout>

);

export default Header;
