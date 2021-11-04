import { styled } from '@mui/system';
import { Links } from '../components/Links';
import deftag from '../utils/util.deftag';

const {
    common: {
        menu_store,
        menu_about,
        menu_tutorial,
    },
} = deftag;

//
const navMenus = [
    {
        key: 'product/list?page=1&cate=all',
        text: menu_store,
    },
    {
        key: 'about',
        text: menu_about,
    },
    {
        key: 'tutorial',
        text: menu_tutorial,
    },
];

//
const NavMenuLayout = styled('nav', {
    name: 'nav-menu-wrap',
})(({ theme }) => ({
    marginLeft: '40px',
    'a': {
        textDecoration: 'none',
        color: theme.palette.textColor,
        margin: '20px',
        padding: theme.spacing(2),
        opacity: .8,
        transition: 'all .5s ease',
        '&:hover': {
            opacity: 1,
        },
    },
}));

//
const Navbar = () => (

    <NavMenuLayout>
        {
            navMenus.map(({ key, text }) => (

                <Links
                    key={key}
                    url={`/${key}`}
                >
                    {text}
                </Links>

            ))
        }
    </NavMenuLayout>

);

export default Navbar;
