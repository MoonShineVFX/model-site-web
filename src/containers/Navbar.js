import { styled } from '@mui/system';
import { Links } from '../components/Links';

const navMenus = [
    {
        key: 'store',
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

const NavMenuBase = styled('nav', {
    name: 'nav-menu-wrap',
})(({ theme }) => ({
    marginLeft: '40px',
    'a': {
        fontSize: '1em',
        textDecoration: 'none',
        color: theme.palette.border.light,
        margin: '20px',
        padding: theme.spacing(2),
        opacity: 1,
        transition: 'all .5s ease',
        '&:hover': {
            opacity: .8,
        },
    },
}));

//
const Navbar = () => (

    <NavMenuBase>
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
    </NavMenuBase>

);

export default Navbar;
