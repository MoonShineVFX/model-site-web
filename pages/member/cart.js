import React, {
    Fragment,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react';

import { Grid } from '@mui/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import HeadTag from '../../src/containers/HeadTag';
import Buttons from '../../src/components/Buttons';
import FontIcon from '../../src/components/FontIcon';
import {
    TitleLayout,
    SectionLayout,
    CartLayout,
    ItemLayout,
} from '../../src/components/member/cartLayout';

import useLocalStorage from '../../src/utils/useLocalStorage';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import deftag from '../../src/utils/util.deftag';
import Service from '../../src/utils/util.service';

const { priceWithCommas } = util;
const {
    cart: {
        text_order_title,
        btn_confirm_order,
        section_title,
        text_notice,
        text_empty_cart,
    },
} = deftag;

// 商品欄位
const TableGrid = ({ colLeft, colRight }) => (

    <Grid
        container
        columnSpacing="20px"
    >
        <Grid
            item
            xs={7}
            className="item-cell"
        >
            {colLeft && colLeft}
        </Grid>
        <Grid
            item
            xs={5}
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
}) => (

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
                        <h4 className="web-line-clamp title" title={title}>{title}</h4>
                    </div>
                </Fragment>
            )}
            colRight={(
                <Fragment>
                    <div className="price">{priceWithCommas(price)}</div>
                    <div className="action">
                        <span onClick={onClick}>
                            <FontIcon icon={faTimes} />
                        </span>
                    </div>
                </Fragment>
            )}
        />
    </ItemLayout>

);

//
const Cart = ({ pageData }) => {

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

        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // 刪除商品
    const handleRemoveItem = (e, id) => {

        e.preventDefault();

        let item = cartItem;
        delete item[id];
        setCartItem(item);

        console.log('cartItem:', cartItem)

        return;
        Service.cartRemove({ productId: id })
            .then(({ list, amount }) => {

                setList(list);
                setAmount(amount);

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
            <HeadTag title={text_order_title} />
            <TitleLayout>{text_order_title}</TitleLayout>

            <SectionLayout>
                <h3 className="title-large">{section_title}</h3>

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
                                                onClick={(e) => handleRemoveItem(e, data.productId)}
                                            />

                                        ))
                                    }
                                </div>

                                <div className="amount">
                                    <TableGrid
                                        colRight={(
                                            <Fragment>
                                                <span>總額</span>
                                                <span className="price">{priceWithCommas(amount)}</span>
                                            </Fragment>
                                        )}
                                    />
                                </div>
                            </Fragment>

                        ) : text_empty_cart
                    }
                </CartLayout>

                <div className="btn-action">
                    <Buttons
                        text={btn_confirm_order}
                        onClick={handleClickOrder}
                    />
                    <p>{text_notice}</p>
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

export async function getServerSideProps ({ req }) {

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
        url: '/cart_products',
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
