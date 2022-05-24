import { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { TitleLayout } from '../../src/components/cart/cartLayout';
import { OrderDetailLayout, ItemLayout } from '../../src/components/order/orderLayout';
import Head from '../../src/containers/Head';
import { ButtonLink } from '../../src/components/Links';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';

const { priceWithCommas, dateFormat } = util;

const OrderDetail = ({ langs, pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            <Head
                title={langs.order_detail}
                description={langs.og_description}
            />
            <TitleLayout>{langs.order_detail}</TitleLayout>

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
                            <h4 className="title">{langs.order_text_order_number}</h4>
                            <div className="value">{pageData.orderNumber}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{langs.order_text_create_at}</h4>
                            <div className="value">{dateFormat(pageData.createdAt)}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{langs.order_text_paid_at}</h4>
                            <div className="value">{dateFormat(pageData.paidAt)}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{langs.order_text_payment}</h4>
                            <div className="value">{langs[`order_payment_${pageData.paidBy}`]}</div>
                        </div>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        mobile={6}
                    >
                        <div className="row-item">
                            <h4 className="title">{langs.order_text_quantity}</h4>
                            <div className="value">{pageData.totalItems}</div>
                        </div>
                         <div className="row-item">
                            <h4 className="title">{langs.order_text_total_price}</h4>
                            <div className="value">{priceWithCommas(pageData.price)}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{langs.order_text_status}</h4>
                            <div className="value">{langs[`order_status_${pageData.status}`]}</div>
                        </div>
                        <div className="row-item">
                            <h4 className="title">{langs.order_text_invoice}</h4>
                            <div className="value">{pageData.invoice}</div>
                        </div>
                    </Grid>
                </Grid>

                <div className="items-container">
                    <Grid
                        container
                        rowSpacing={{
                            xs: '20px',
                            mobile: '30px',
                        }}
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
                </div>

                <div className="btn-action">
                    <ButtonLink
                        text={langs.member_my_product}
                        url="/member/account"
                    />
                </div>
            </OrderDetailLayout>
        </Fragment>

    );

};

export default OrderDetail;

export async function getServerSideProps ({ req, params, locale }) {

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
        url: `/orders/${params.id}?lang=${locale}`,
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
