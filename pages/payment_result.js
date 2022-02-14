import React, { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import {
    TitleLayout,
    SectionLayout,
    CartLayout,
} from '../src/components/member/cartLayout';
import HeadTag from '../src/containers/HeadTag';
import { ButtonLink } from '../src/components/Links';
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

    // Router
    const router = useRouter();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
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
                        url={`/order/${router.query.no}`}
                        className="btn-orderDetail"
                        text={text_direct_to_order_detail}
                    />
                </ResultLayout>
            </SectionLayout>
        </Fragment>

    );

};

export default PaymentResult;
