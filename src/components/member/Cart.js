import { useEffect, useState, useContext } from 'react';
import { styled } from '@mui/system';
import Box from '../Box';
import Links from '../Links';
import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';

const { priceWithCommas } = util;

const {
    header: {
        text_cart_title,
        text_go_to_checkout,
        text_empty_cart,
    },
} = deftag;

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
        fontWeight: 'normal',
        margin: '0',
    },
    'span': {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
}));

//
const Cart = () => {

    // Context
    const { logged } = useContext(GlobalContext);

    // State
    const [items, setItems] = useState({});

    useEffect(() => {

        setItems(localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : {});

    }, []);

    return (

        <CartLayout>
            <h4 className="title">{text_cart_title}</h4>
            <div className="items">
                {
                    Object.entries(items).length ? (

                        Object.keys(items).map((id) => (

                            <ItemWrapLayout
                                key={id}
                                url={`/product/${id}`}
                                newPage
                            >
                                <div className="thumb">
                                    <img
                                        src={items[id].imgUrl}
                                        alt={items[id].title}
                                        title={items[id].title}
                                        width="100"
                                        height="63"
                                    />
                                </div>
                                <div className="content">
                                    <h4 className="title">{items[id].title}</h4>
                                    <span className="price">{priceWithCommas(items[id].price)}</span>
                                </div>
                            </ItemWrapLayout>

                        ))

                    ) : text_empty_cart
                }
            </div>
            <div className="goToOrder">
                <Links url={`/${logged ? 'member/cart' : 'signin'}`}>{text_go_to_checkout}</Links>
            </div>
        </CartLayout>

    );

};

export default Cart;
