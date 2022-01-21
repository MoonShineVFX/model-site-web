import React, { Fragment, useContext, useEffect } from 'react';
import { styled } from '@mui/system';
import HeadTag from '../src/containers/HeadTag';
import { ButtonLink } from '../src/components/Links';
import {
    TitleLayout,
    SectionLayout,
    CartLayout,
} from '../src/components/member/cartLayout';

import { GlobalContext } from '../src/context/global.state';
import deftag from '../src/utils/util.deftag';

const {
    paymentResult: {
        page_title,
        text_message,
        text_direct_to_order_detail,
    },
} = deftag;

//
const ResultLayout = styled(CartLayout)(({ theme }) => ({
    minHeight: '200px',
    fontSize: '1.2em',
    textAlign: 'center',
    padding: '40px 80px 80px',
    '.btn-orderDetail': {
        width: '100%',
    },
    '.model-button': {
        marginTop: '20px',
    },
}));

//
const PaymentResult = () => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            <HeadTag title={page_title} />
            <TitleLayout>{page_title}</TitleLayout>

            <SectionLayout>
                <ResultLayout>
                    <p>{text_message}</p>

                    <ButtonLink
                        url={`/order/MSM20220112000001`}
                        className="btn-orderDetail"
                        text={text_direct_to_order_detail}
                    />
                </ResultLayout>
            </SectionLayout>
        </Fragment>

    );

};

export default PaymentResult;

// export async function getServerSideProps ({ req, params, query }) {

//     // 沒有 cookie(token) 導登入頁
//     if (!req.cookies.token) {

//         return {
//             redirect: {
//                 destination: '/signin',
//                 permanent: false,
//             },
//         };

//     }

//     return {
//         props: {
//             pageData: {},
//         },
//     };

// }
