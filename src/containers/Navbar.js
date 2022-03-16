import { NavMenuLayout } from './globalLayout';
import Links from '../components/Links';
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
        key: 'product/list?page=1',
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
const Navbar = ({ ...rest }) => (

    <NavMenuLayout {...rest}>
        {
            navMenus.map(({ key, text }) => (

                <Links
                    key={key}
                    url={`/${key}`}
                    title={text}
                >
                    {text}
                </Links>

            ))
        }
    </NavMenuLayout>

);

export default Navbar;
