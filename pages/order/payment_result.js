import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { ButtonLink } from '../../src/components/Links';
import Result from '../../src/components/Result';
import { GlobalContext } from '../../src/context/global.state';
import deftag from '../../src/utils/util.deftag';

const {
    member: { text_my_product },
    paymentResult: {
        page_title,
        text_direct_to_order_detail,
    },
} = deftag;

//
const ResultWrap = styled(Result)(({ theme }) => ({
    '.model-button.third': {
        borderRadius: '40px',
        marginTop: '30px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '60px 40px',
    },
    [theme.breakpoints.down('middle')]: {
        padding: '40px',
        'button.model-button': {
            fontSize: '1em',
            paddingTop: '16px',
            paddingBottom: '16px',
            '&.third': {
                marginTop: '20px',
            },
        },
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

        <ResultWrap
            title={page_title}
            btnText={text_my_product}
            linkTo="/member/account"
            icon={faCircleCheck}
        >
            <ButtonLink
                type="third"
                url={`/order/${router.query.no}`}
                text={text_direct_to_order_detail}
            />
        </ResultWrap>

    );

};

export default PaymentResult;
