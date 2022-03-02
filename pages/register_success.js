import { useContext, useEffect } from 'react';
import Result from '../src/components/Result';
import { GlobalContext } from '../src/context/global.state';
import deftag from '../src/utils/util.deftag';

const {
    memberSign: {
        text_register_success_title,
        text_register_success_message,
        btn_return_to_signin,
    },
} = deftag;

//
const PaymentResult = () => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Result
            title={text_register_success_title}
            message={text_register_success_message}
            btnText={btn_return_to_signin}
            linkTo="/signin"
        />

    );

};

export default PaymentResult;
