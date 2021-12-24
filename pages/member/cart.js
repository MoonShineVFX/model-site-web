import React, {
    Fragment,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react';

import { useForm } from 'react-hook-form';
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
    },
} = deftag;

// 假 form
const Form = ({ data, ref}) => {

    // console.log('ref:', ref)

    return (

        <form
            name="Newebpay"
            method="POST"
            action="https://core.newebpay.com/MPG/mpg_gateway"
            ref={ref}
        >
            {
                Object.keys(data).map((key) => (

                    <input
                        key={key}
                        type="hidden"
                        name={key}
                        value={data[key]}
                    />

                ))
            }
        </form>
    );
};

// 商品欄位
const TableGrid = ({ colLeft, colRight }) => (

    <Grid
        container
        alignContent="center"
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
        title,
        price,
        imgUrl,
    },
}) => (

    <ItemLayout
        url={`/product/${id}`}
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

    // console.log('pageData:', pageData)

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // Ref
    const formRef = useRef(null);

    // State
    const [visible, setVisible] = useState(false);
    const [fields, setFields] = useState({});

    useEffect(() => {

        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // 刪除商品
    const handleRemoveItem = (e) => {

        e.preventDefault();
        console.log('remove');

    };

    // 按鈕送出訂單
    const btnOrder = () => {};

    // 送出訂單
    const handleClickOrder = () => {

        // console.log('order:', pageData.list.flatMap(({ id }) => id));

        // Fake
        const resData = {
            "MerchantID": "ID",
            "TradeInfo": "wuLCsERCcUsAmNxjQKB7VBSa3Q3JyaU23+9JDohJgjTKjwfESsJW1HnAN1OgKmSY5klzSVqVt6AatcCH0tnJpcUoSsh0z4tyH0uOvpkKqB71iVMqdBT55ZiM8yjlxs4Fveq/P4auiiLV2wSv4cnd8NqhJxLJkQMTy1fYA/xJ5YkZxSmCUy+yqf5IxT/cSXGKKDUoLZ8z9FxfGteL7N7EBQgUbcpQgC1LNYpnsdi7OBWAGJEL7g944cTCIoKYrDQPhuTegXKcyOPnDzBNN+iYN5lnMcFUxe8VbpSgCuu9fA4uh+2eizPg1FHvyF3lc18XFBb2ICMp+n6erV5gYz4gJtcM89+FwRIaFPLHOvo4VGdLJYJ57alaFyB5Vd2QBJIx681maKB50Pr56NKc9sxqsClAWqzMKSDV/SPOCo48hYBRQB61cbmkaIcOdrad06Ztxza6r95Wp3qRY4119S4JfUUMK/jISPG1glA6dbRZT89veYGcrnsJ2IAIXKEThUhiMFcvOU8/bD6gsULIEGRpH+NEEupRbT7ozItu3SDB0Tg=",
            "TradeSha": "5D912961AB1F1FE17F816BF609DF0737ADE694BBC2FCA325232F1E6EFE457E9C",
            "Version": "1.6"
        };

        setVisible(true);
        setFields({ ...resData });
        formRef.current.submit();

        return;
        Service.order({ cartIds: pageData.list.flatMap(({ id }) => id) })
            .then((resData) => {

                console.log('resData:', resData);
                setVisible(true);
                setFields({ ...resData });
                formRef.current.submit();

            });

    };

    return (

        <Fragment>
            <HeadTag title={text_order_title} />
            <TitleLayout>{text_order_title}</TitleLayout>

            <SectionLayout>
                <h3 className="title-large">{section_title}</h3>

                <CartLayout>
                    <div className="items">
                        {
                            pageData.list.map((data) => (

                                <Item
                                    key={data.id}
                                    data={data}
                                    onClick={handleRemoveItem}
                                />

                            ))
                        }
                    </div>

                    <div className="amount">
                        <TableGrid
                            colRight={(
                                <Fragment>
                                    <span>總額</span>
                                    <span className="price">{priceWithCommas(pageData.amount)}</span>
                                </Fragment>
                            )}
                        />
                    </div>
                </CartLayout>

                <div className="btn-action">
                    <Buttons
                        text={btn_confirm_order}
                        onClick={handleClickOrder}
                    />
                    <p>{text_notice}</p>
                </div>
            </SectionLayout>

            {/* <form
                name="Newebpay"
                method="POST"
                action="https://core.newebpay.com/MPG/mpg_gateway"
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
            </form> */}

            {
                visible &&
                    <Form
                        data={fields}
                        ref={formRef}
                    />
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

    // const resData = await fetch('http://localhost:1006/json/member/cart.json');
    // const data = await resData.json();

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

/**
 * trigger form submit
 * https://github.com/react-hook-form/react-hook-form/issues/566
 */
