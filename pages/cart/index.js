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
import Head from '../../src/containers/Head';
import Buttons from '../../src/components/Buttons';
import FontIcon from '../../src/components/FontIcon';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import Service from '../../src/utils/util.service';
import useLocalStorage from '../../src/utils/useLocalStorage';
import useGoogleAnalytics from '../../src/utils/useGoogleAnalytics';

const { priceWithCommas } = util;

const fakeData = {
    "btn_next": "下一步",
    "cart_text_fill_out_message": "填寫購買資訊",
    "cart_member_info_title": "會員資訊",
    "cart_member_real_name": "真實姓名",
    "cart_member_address": "地址",
    "cart_invoice_title": "發票資訊",
    "cart_invoice_type_paper": "紙本",
    "cart_invoice_type_electronic": "電子",
    "cart_invoice_text_same_as": "同會員資訊",
    "cart_invoice_text_re_fill": "重新填寫",
    "cart_invoice_way_two": "二聯式",
    "cart_invoice_way_three": "三聯式",
    "cart_invoice_company_name": "公司名稱",
    "cart_invoice_tax_number": "統一編號",
    "cart_text_fill_out_warning": "發票資訊不可更改,請確認是否都填寫正確!",
};

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

// 會員與發票資訊
const OtherInfoForm = ({ email }) => (

    <Fragment>

        <div className="btn-action">
            <Buttons
                text={langs.btn_confirm_order}
                // onClick={handleClickOrder}
            />
            <p>{langs.cart_text_notice}</p>
        </div>
    </Fragment>
);

//
const Cart = ({ langs, pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const eventTracker = useGoogleAnalytics();

    // Ref
    const formRef = useRef(null);

    // State
    const [cartItem, setCartItem] = useLocalStorage('cartItem');
    const [fields, setFields] = useState({});
    const [list, setList] = useState(pageData.list);
    const [amount, setAmount] = useState(pageData.amount);
    const [memberInfo, setMemberInfo] = useState(false);

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
    const handleNextStep = () => {

        setMemberInfo(true);

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

                        ) : langs.cart_text_empty
                    }
                </CartLayout>

                <div className="btn-action">
                    <Buttons
                        text={fakeData.btn_next}
                        onClick={handleNextStep}
                    />
                    <p>{fakeData.cart_text_fill_out_message}</p>
                </div>

                {
                    memberInfo && <OtherInfoForm email={email} />
                }
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

}
