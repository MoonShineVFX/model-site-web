import { Fragment } from 'react';
import HeadTag from '../../src/containers/HeadTag';
import { TitleLayout } from '../../src/components/member/cartLayout';

import { BoxWrapLayout } from '../../src/components/member/accountLayout';
import { OrderDetailLayout } from '../../src/components/order/orderLayout';
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
} = deftag;

const OrderDetail = ({ pageData }) => {

    // console.log('pageData:', pageData)

    return (

        <Fragment>
            <HeadTag title={text_order_detail_title} />
            <TitleLayout>{text_order_detail_title}</TitleLayout>

            <OrderDetailLayout>
                <div className="row">
                    <h4 className="title">{text_order_number}</h4>
                    <div>{pageData.orderNumber}</div>
                </div>
                <div className="row">
                    <h4 className="title">{text_order_create_at}</h4>
                    <div>{dateFormat(pageData.createdAt)}</div>
                </div>
                <div className="row">
                    <h4 className="title">{text_order_quantity}</h4>
                    <div>{pageData.totalItems}</div>
                </div>
                <div className="row">
                    <h4 className="title">{text_order_total_price}</h4>
                    <div>{priceWithCommas(pageData.price)}</div>
                </div>
                <div className="row">
                    <h4 className="title">{text_order_status}</h4>
                    <div>{deftag.orderRecord[`text_status_${pageData.status}`]}</div>
                </div>
                <div className="row">
                    <h4 className="title">{text_order_payment}</h4>
                    <div>{deftag.orderRecord[`text_payment_${pageData.paidBy}`]}</div>
                </div>
                <div className="row">
                    <h4 className="title">{text_order_paid_at}</h4>
                    <div>{dateFormat(pageData.paidAt)}</div>
                </div>
                <div className="row">
                    <h4 className="title">{text_order_invoice}</h4>
                    <div>{pageData.invoice}</div>
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
        url: `/orders/${params.order_number}`,
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
