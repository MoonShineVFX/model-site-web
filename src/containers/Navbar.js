import { NavMenuLayout } from './globalLayout';
import Links from '../components/Links';
import useDeftags from '../utils/useDeftags';

const Navbar = ({ ...rest }) => {

    // Hook
    const [deftag] = useDeftags();

    //
    const navMenus = [
        {
            key: 'product/list?page=1',
            text: deftag?.menu_store,
        },
        {
            key: 'about',
            text: deftag?.menu_about,
        },
        {
            key: 'tutorial',
            text: deftag?.menu_tutorial,
        },
    ];

    return (

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

};

export default Navbar;
