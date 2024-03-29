import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {
    TitleLayout,
    SectionLayout,
    CartLayout,
    ItemLayout,
} from '../../src/components/cart/cartLayout';
import Head from '../../src/containers/Head';
import Buttons from '../../src/components/Buttons';
import FontIcon from '../../src/components/FontIcon';
import InvoiceForm from '../../src/components/cart/InvoiceForm';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import Service from '../../src/utils/util.service';
import useLocalStorage from '../../src/utils/useLocalStorage';
import useGoogleAnalytics from '../../src/utils/useGoogleAnalytics';

const { priceWithCommas } = util;

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

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    // Context
    const { fxRate } = useContext(GlobalContext);

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
                                width="103"
                                height="66"
                            />
                        </div>

                        <div className="info">
                            <h4 className="title web-line-clamp" title={title}>{title}</h4>
                            {
                                matches &&
                                    <span className="price">{priceWithCommas(price, 2, fxRate)}</span>
                            }
                        </div>
                    </Fragment>
                )}
                colRight={(
                    <div>
                        {
                            !matches &&
                                <span className="price">{priceWithCommas(price, 2, fxRate)}</span>
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
const Cart = ({ langs, pageData }) => {

    // Context
    const { fxRate, globalDispatch } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const eventTracker = useGoogleAnalytics();

    // State
    const [cartItem, setCartItem] = useLocalStorage('cartItem');
    const [list, setList] = useState(pageData.list);
    const [amount, setAmount] = useState(pageData.amount);
    const [invoiceVisible, setInvoiceVisible] = useState(false);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // 刪除商品
    const handleRemoveItem = (e, { id, productId, title }) => {

        // Tracker
        eventTracker({
            category: title,
            action: `刪除購物車 id_${productId}`,
            label: '購物車',
        });

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

    // 下一步
    const handleNextStep = () => setInvoiceVisible(true);

    return (

        <Fragment>
            <Head
                title={langs.cart_order_title}
                description={langs.og_description}
            />

            <TitleLayout>{langs.cart_order_title}</TitleLayout>

            <SectionLayout>
                <h3 className="title-large">{langs.cart_section_title}</h3>

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
                                                <span className="price">{priceWithCommas(amount, 2, fxRate)}</span>
                                            </div>

                                        ) : (

                                            <TableGrid
                                                colRight={(
                                                    <div>
                                                        <span>總額</span>
                                                        <div className="price">{priceWithCommas(amount, 2, fxRate)}</div>
                                                    </div>
                                                )}
                                            />

                                        )
                                    }
                                </div>
                            </Fragment>

                        ) : langs.cart_text_empty
                    }
                </CartLayout>

                <div className="btn-action">
                    <Buttons
                        text={langs.btn_next}
                        onClick={handleNextStep}
                    />
                    <p>{langs.cart_text_fill_out_message}</p>
                </div>

                {
                    invoiceVisible && <InvoiceForm items={list} />
                }
            </SectionLayout>
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

}
