import { useContext } from 'react';
import { styled } from '@mui/system';
import Box from '../Box';
import Links from '../Links';
import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';

const { priceWithCommas } = util;

//
const CartLayout = styled(Box)(({ theme }) => ({
    minWidth: '300px',
    right: '150px',
    '> *': {
        padding: '16px',
    },
    '.title': {
        margin: '0',
    },
    '.items': {
        borderTop: `1px solid ${theme.palette.bgColor}`,
        borderBottom: `1px solid ${theme.palette.bgColor}`,
    },
    '.goToOrder': {
        textAlign: 'center',
        'a': {
            fontSize: '1.25em',
            color: theme.palette.textColor,
            textDecoration: 'none',
        }
    },
}));

//
const ItemWrapLayout = styled(Links)(({ theme }) => ({
    color: theme.palette.textColor,
    textDecoration: 'none',
    display: 'flex',
    '&:not(:last-child)': {
        marginBottom: '20px',
    },
    '.thumb': {
        width: '100px',
        height: '63px',
        borderRadius: '10px',
        marginRight: '20px',
        overflow: 'hidden',
    },
    '.content': {
        flex: '0 0 calc(100% - 100px)',
    },
    '.title': {
        margin: '0',
    },
    'span': {
        fontSize: '1.3em',
        fontWeight: 'bold',
    },
}));

//
const Cart = () => {

    // Context
    const { deftags, logged, cart, globalDispatch } = useContext(GlobalContext);

    // 當頁再次點擊要關閉 box
    const handleResetBox = () => globalDispatch({ type: 'target_box', payload: '' });

    return (

        <CartLayout>
            <h4 className="title">{deftags.cart_box_title}</h4>
            <div className="items">
                {
                    Object.entries(cart.items || {}).length ? (

                        Object.keys(cart.items).map((id) => (

                            <ItemWrapLayout
                                key={id}
                                url={`/product/${id}`}
                                newPage
                            >
                                <div className="thumb">
                                    <img
                                        src={cart.items[id].imgUrl}
                                        alt={cart.items[id].title}
                                        width="100"
                                        height="63"
                                    />
                                </div>
                                <div className="content">
                                    <h4 className="title">{cart.items[id].title}</h4>
                                    <span className="price">{priceWithCommas(cart.items[id].price)}</span>
                                </div>
                            </ItemWrapLayout>

                        ))

                    ) : deftags.cart_text_empty
                }
            </div>
            <div className="goToOrder">
                <Links
                    url={`/${logged ? 'cart' : 'signin'}`}
                    title={deftags.cart_go_to_checkout}
                    onClick={handleResetBox}
                >
                    {deftags.cart_go_to_checkout}
                </Links>
            </div>
        </CartLayout>

    );

};

export default Cart;
