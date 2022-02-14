import { NavMenuLayout } from './globalLayout';
import Links from '../components/Links';
import deftag from '../utils/util.deftag';

const {
    common: {
        text_menu_store,
        text_menu_about,
        text_menu_tutorial,
    },
} = deftag;

//
const navMenus = [
    {
        key: 'product/list?page=1',
        text: text_menu_store,
    },
    {
        key: 'about',
        text: text_menu_about,
    },
    {
        key: 'tutorial',
        text: text_menu_tutorial,
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
