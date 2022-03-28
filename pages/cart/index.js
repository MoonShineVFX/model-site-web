import React, {
    Fragment,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react';

import { Grid, useMediaQuery } from '@mui/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {
    TitleLayout,
    SectionLayout,
    CartLayout,
    ItemLayout,
} from '../../src/components/member/cartLayout';
import HeadTag from '../../src/containers/HeadTag';
import Buttons from '../../src/components/Buttons';
import FontIcon from '../../src/components/FontIcon';

import useLocalStorage from '../../src/utils/useLocalStorage';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import deftag from '../../src/utils/util.deftag';
import Service from '../../src/utils/util.service';

const { priceWithCommas } = util;
const {
    cart: {
        cart_order_title,
        btn_confirm_order,
        cart_section_title,
        cart_text_notice,
        cart_text_empty,
    },
} = deftag;

// 商品欄位
const TableGrid = ({ colLeft, colRight }) => (

    <Grid
        container
        columnSpacing={{
            xs: '20px',
            sm: '30px',
        }}
    >
        <Grid
            item
            xs={10}
            sm={8}
            className="item-cell"
        >
            {colLeft && colLeft}
        </Grid>
        <Grid
            item
            xs={2}
            sm={4}
            className="item-cell right"
        >
            {colRight && colRight}
        </Grid>
    </Grid>
);

// 商品
const Item = ({
    onClick,
    data: {
        id,
        productId,
        title,
        price,
        imgUrl,
    },
}) => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (

        <ItemLayout
            url={`/product/${productId}`}
            newPage
        >
            <TableGrid
                colLeft={(
                    <Fragment>
                        <div className="thumb">
                            <img
                                src={imgUrl}
                                alt={title}
                                title={title}
                                width="103"
                                height="66"
                            />
                        </div>

                        <div className="info">
                            <h4 className="title web-line-clamp" title={title}>{title}</h4>
                            {
                                matches &&
                                    <span className="price">{priceWithCommas(price)}</span>
                            }
                        </div>
                    </Fragment>
                )}
                colRight={(
                    <div>
                        {
                            !matches &&
                                <span className="price">{priceWithCommas(price)}</span>
                        }

                        <span className="action" onClick={onClick}>
                            <FontIcon icon={faTimes} />
                        </span>
                    </div>
                )}
            />
        </ItemLayout>

    );

};

//
const Cart = ({ pageData }) => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // Ref
    const formRef = useRef(null);

    // State
    const [cartItem, setCartItem] = useLocalStorage('cartItem');
    const [fields, setFields] = useState({});
    const [list, setList] = useState(pageData.list);
    const [amount, setAmount] = useState(pageData.amount);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // 刪除商品
    const handleRemoveItem = (e, { id, productId }) => {

        let obj = { ...cartItem };
        delete obj[productId];

        e.preventDefault();
        Service.cartRemove({ cartId: id })
            .then(({ list, amount }) => {

                setList(list);
                setAmount(amount);
                setCartItem(obj); // 更新 localStorage
                globalDispatch({
                    type: 'remove_cart',
                    payload: productId,
                });

            });

    };

    // 送出訂單
    const handleClickOrder = () => {

        Service.order({ cartIds: pageData.list.flatMap(({ id }) => id) })
            .then((resData) => {

                setFields({ ...resData });
                formRef.current.submit();
                localStorage.removeItem('cartItem'); // 清除暫存購物車

            });

    };

    return (

        <Fragment>
            <HeadTag title={cart_order_title} />
            <TitleLayout>{cart_order_title}</TitleLayout>

            <SectionLayout>
                <h3 className="title-large">{cart_section_title}</h3>

                <CartLayout>
                    {
                        list.length ? (

                            <Fragment>
                                <div className="items">
                                    {
                                        list.map((data) => (

                                            <Item
                                                key={data.id}
                                                data={data}
                                                onClick={(e) => handleRemoveItem(e, data)}
                                            />

                                        ))
                                    }
                                </div>

                                <div className="amount">
                                    {
                                        matches ? (

                                            <div>
                                                <span>總額</span>
                                                <span className="price">{priceWithCommas(amount)}</span>
                                            </div>

                                        ) : (

                                            <TableGrid
                                                colRight={(
                                                    <div>
                                                        <span>總額</span>
                                                        <div className="price">{priceWithCommas(amount)}</div>
                                                    </div>
                                                )}
                                            />

                                        )
                                    }
                                </div>
                            </Fragment>

                        ) : cart_text_empty
                    }
                </CartLayout>

                <div className="btn-action">
                    <Buttons
                        text={btn_confirm_order}
                        onClick={handleClickOrder}
                    />
                    <p>{cart_text_notice}</p>
                </div>
            </SectionLayout>

            {
                !!Object.keys(fields).length &&
                    <form
                        name="Newebpay"
                        method="POST"
                        action="https://ccore.newebpay.com/MPG/mpg_gateway"
                        ref={formRef}
                    >
                        {
                            Object.keys(fields).map((key) => (

                                <input
                                    key={key}
                                    type="hidden"
                                    name={key}
                                    value={fields[key]}
                                />

                            ))
                        }
                    </form>
            }
        </Fragment>

    );

};

export default Cart;

export async function getServerSideProps ({ req, locale }) {

    // 沒有 cookie(token) 導登入頁
    if (!req.cookies.token) {

        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };

    }

    const resData = await util.serviceServer({
        url: `/cart_products?lang=${locale}`,
        headers: {
            Cookie: `sessionid=${req.cookies.sessionid}`,
            Authorization: `Bearer ${req.cookies.token}`,
        },
    });

    const { data } = resData;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: data.data,
        },
    };

};
