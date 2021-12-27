import { Fragment } from 'react';
import util from '../../src/utils/util';

const OrderDetail = ({ pageData }) => (

    <Fragment>
        order detail
    </Fragment>

);

export default OrderDetail;

export async function getServerSideProps ({ params }) {

    // const res = await util.serviceServer({
    //     method: 'get',
    //     url: `/web_products/${+params.order_number}`,
    // });

    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/order/MSM20211224000001.json');
    const data = await res.json();

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
