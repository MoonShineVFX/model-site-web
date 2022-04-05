import {
    Fragment,
    useState,
    useContext,
    useEffect,
} from 'react';
import { useForm } from 'react-hook-form';

import { SignLayout, BtnDirectLayout } from '../src/components/member/memberSignLayout';
import Head from '../src/containers/Head';
import Buttons from '../src/components/Buttons';
import FormWrap, { FormRow, FormSuccessMesg } from '../src/components/FormWrap';

import { GlobalContext } from '../src/context/global.state';
import Service from '../src/utils/util.service';

const ForgotPassword = ({ langs }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // State
    const [success, setSuccess] = useState(false);

    // 送資料
    const handleReqData = (reqData) => {

        Service.forgotPassword(reqData)
            .then(() => setSuccess(true));

    };

    return (

        <Fragment>
            <Head
                title={langs.text_forgot_password}
                description={langs.og_description}
            />

            <SignLayout>
                <FormWrap
                    {...!success && { title: langs.text_forgot_password }}
                >
                    {
                        success ? <FormSuccessMesg mesg={langs.text_email_sent} /> : (

                            <form onSubmit={handleSubmit(handleReqData)}>
                                <FormRow
                                    name="email"
                                    errors={errors}
                                >
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder={langs.text_enter_register_email}
                                        {...register('email', { required: true })}
                                    />
                                </FormRow>

                                <div className="form-row form-row-btns">
                                    <Buttons
                                        type="submit"
                                        text={langs.btn_get_reset_password_link}
                                    />

                                    <BtnDirectLayout
                                        type="third"
                                        url="/signin"
                                        text={langs.btn_return_to_signin}
                                    />
                                </div>
                            </form>

                        )
                    }
                </FormWrap>
            </SignLayout>
        </Fragment>

    );

};

export default ForgotPassword;

export async function getServerSideProps ({ req }) {

    // 有 cookie(token) 導首頁
    if (!!req.cookies.token) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    }

    return {
        props: {},
    };

}
