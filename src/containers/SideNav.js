import { useContext } from 'react';
import { faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

import { SideNavLayout } from './globalLayout';
import Links from '../components/Links';
import FontIcon from '../components/FontIcon';
import Community from '../components/Community';
import Navbar from './Navbar';
import SideNavIcon from './SideNavIcon';

import { GlobalContext } from '../context/global.state';
import util from '../utils/util';
import deftag from '../utils/util.deftag';

const { redirectTo } = util;
const {
    memberSign: { text_signin },
    member: { text_logout, text_member_center },
} = deftag;

//
const Sidenav = () => {

    // Context
    const {
        logged,
        sideNav,
        cart,
        globalDispatch,
    } = useContext(GlobalContext);

    // 手機版 sidenav: 關閉
    const handleHideSideNav = () => globalDispatch({ type: 'sidenav', payload: false });

    // mWeb: 登出
    const handleClickLogout = (e) => {

        e.preventDefault();
        Cookies.remove('token');
        globalDispatch({ type: 'target_box', payload: '' });
        localStorage.removeItem('cartItem'); // 清除暫存購物車
        redirectTo();

    };

    return (

        <SideNavLayout className={sideNav ? 'active' : ''}>
            <div className="wrap">
                <div className="sidenav-item">
                    <SideNavIcon
                        className="btn-close"
                        icon={faTimes}
                        onClick={handleHideSideNav}
                    />
                </div>

                <Links
                    url={logged ? '/member/cart' : '/signin'}
                    className="shopping-cart"
                >
                    <FontIcon icon={faShoppingCart} />
                    <span className="count">({cart.count})</span>
                </Links>

                <Links url={logged ? '/member/account' : '/signin'}>
                    {logged ? text_member_center : text_signin}
                </Links>

                <Navbar className="mWeb-navbar" />

                {
                    logged &&
                        <Links
                            url="#"
                            onClick={handleClickLogout}
                        >
                            {text_logout}
                        </Links>
                }

                <Community />
            </div>
            <div className="mask" onClick={handleHideSideNav}></div>
        </SideNavLayout>

    );

};

export default Sidenav;
