import { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { TitleLayout } from '../../src/components/member/cartLayout';
import { OrderDetailLayout, ItemLayout } from '../../src/components/order/orderLayout';
import HeadTag from '../../src/containers/HeadTag';
import { ButtonLink } from '../../src/components/Links';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import deftag from '../../src/utils/util.deftag';

const { priceWithCommas, dateFormat } = util;

const {
    orderRecord: {
        text_order_number,
        text_order_create_at,
        text_order_paid_at,
        text_order_status,
        text_order_quantity,
        text_order_total_price,
        text_order_payment,
        text_order_invoice,
        text_order_detail_title,
    },
    member: {
        text_my_product
    },
} = deftag;

const OrderDetail = ({ pageData }) => {

    // Fake
    pageData.products = [
        {
            "id": 1,
            "title": "測試模型1 測試模型1 測試模型1 測試模型1 測試模型1 測試模型1",
            "imgUrl": "//fakeimg.pl/150x110",
            "price": 100
        },
        {
            "id": 2,
            "title": "測試模型2",
            "imgUrl": "//fakeimg.pl/150x110",
            "price": 100
        },
        {
            "id": 3,
            "title": "測試模型3",
            "imgUrl": "//fakeimg.pl/150x110",
            "price": 100
        },
        {
            "id": 4,
            "title": "測試模型4",
            "imgUrl": "//fakeimg.pl/150x110",
            "price": 100
        },
        {
            "id": 5,
            "title": "測試模型5",
            "imgUrl": "//fakeimg.pl/150x110",
            "price": 100
        },
    ];

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            <HeadTag title={text_order_detail_title} />
            <TitleLayout>{text_order_detail_title}</TitleLayout>

            <OrderDetailLayout>
                <Grid
                    container
                    rowSpacing={{ mobile: '60px' }}
                    columnSpacing="60px"
                    className="info"
                >
                    <Grid
                        item
                        xs={12}
                        mobile={6}
                    >
                        <div className="row-item">
                            <h4 className="title">{text_order_number}</h4>
                            <div>{pageData.orderNumber}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{text_order_create_at}</h4>
                            <div>{dateFormat(pageData.createdAt)}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{text_order_paid_at}</h4>
                            <div>{dateFormat(pageData.paidAt)}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{text_order_payment}</h4>
                            <div>{deftag.orderRecord[`text_payment_${pageData.paidBy}`]}</div>
                        </div>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        mobile={6}
                    >
                        <div className="row-item">
                            <h4 className="title">{text_order_quantity}</h4>
                            <div>{pageData.totalItems}</div>
                        </div>
                         <div className="row-item">
                            <h4 className="title">{text_order_total_price}</h4>
                            <div>{priceWithCommas(pageData.price)}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{text_order_status}</h4>
                            <div>{deftag.orderRecord[`text_status_${pageData.status}`]}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{text_order_invoice}</h4>
                            <div>{pageData.invoice}</div>
                        </div>
                    </Grid>
                </Grid>

                <Grid
                    container
                    rowSpacing="30px"
                    columnSpacing="60px"
                    className="items"
                >
                    {
                        pageData.products.map(({ id, title, imgUrl, price }) => (

                            <Grid
                                key={id}
                                item
                                xs={12}
                                mobile={6}
                            >
                                <ItemLayout
                                    url={`/product/${id}`}
                                    newPage
                                >
                                    <span className="thumb">
                                        <img
                                            src={imgUrl}
                                            alt={title}
                                            title={title}
                                            width="150"
                                            height="110"
                                        />
                                    </span>
                                    <span className="content">
                                        <h4 className="title web-line-clamp">{title}</h4>
                                        <span>{priceWithCommas(price)}</span>
                                    </span>
                                </ItemLayout>
                            </Grid>

                        ))
                    }
                </Grid>

                <div className="btn-action">
                    <ButtonLink
                        text={text_my_product}
                        url="/member/account"
                    />
                </div>
            </OrderDetailLayout>
        </Fragment>

    );

};

export default OrderDetail;

export async function getServerSideProps ({ req, params }) {

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
        method: 'get',
        url: `/orders/${params.id}`,
        headers: {
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
