import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Result from '../../src/components/Result';
import { GlobalContext } from '../../src/context/global.state';
import deftag from '../../src/utils/util.deftag';

const {
    paymentResult: {
        page_title,
        text_message,
        text_direct_to_order_detail,
    },
} = deftag;

//
const PaymentResult = () => {

    // Router
    const router = useRouter();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Result
            title={page_title}
            message={text_message}
            btnText={text_direct_to_order_detail}
            linkTo={`/order/${router.query.no}`}
        />

    );

};

export default PaymentResult;
