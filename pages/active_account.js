import { useContext, useEffect } from 'react';
import Result from '../src/components/Result';
import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import deftag from '../src/utils/util.deftag';

const {
    memberSign: {
        text_active_account_title,
        text_active_account_message,
        btn_return_to_signin,
    },
} = deftag;

//
const ActiveAccount = () => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Result
            title={text_active_account_title}
            message={text_active_account_message}
            btnText={btn_return_to_signin}
            linkTo="/signin"
        />

    );

};

export default ActiveAccount;

export async function getServerSideProps ({ req, query }) {

    // 有 cookie(token) 導首頁
    if (!!req.cookies.token) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    }

    await util.serviceServer({
        method: 'get',
        url: `/active_account?uid=${query.uid}&token=${query.token}`,
    });

    return {
        props: {},
    };

};
