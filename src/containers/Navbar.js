import { styled } from '@mui/system';
import { Links } from '../components/Links';

const navMenus = [
    {
        key: 'product/list',
        text: '商店',
    },
    {
        key: 'about',
        text: '關於',
    },
    {
        key: 'document',
        text: '文件',
    },
];

const NavMenuLayout = styled('nav', {
    name: 'nav-menu-wrap',
})(({ theme }) => ({
    marginLeft: '40px',
    'a': {
        fontSize: '0.9em',
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
                    url={key}
                >
                    {text}
                </Links>

            ))
        }
    </NavMenuLayout>

);

export default Navbar;
