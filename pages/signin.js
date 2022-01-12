import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import SigninGoogle from '../src/components/third-party/SigninGoogle';
import Buttons from '../src/components/Buttons';
import Links from '../src/components/Links';
import FormWrap, { FormRow } from '../src/components/FormWrap';
import HeadTag from '../src/containers/HeadTag';
import {
    SignLayout,
    BtnDirectLayout,
    ForgotPasswordLayout,
} from '../src/components/member/memberSignLayout';

import { GlobalContext } from '../src/context/global.state';
import deftag from '../src/utils/util.deftag';
import Service from '../src/utils/util.service';

const {
    memberSign: {
        text_signin,
        text_register,
        text_forgot_password,
        text_signin_title,
        text_account_with_email,
        text_password,
    },
    error: {
        error_password_at_least_eight,
        error_pattern,
    },
} = deftag;

const Signin = () => {

    // Router
    const router = useRouter();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 送資料
    const handleReqData = (reqData) => {

        let auth = btoa(`${reqData.email}:${reqData.password}`);
        Service.signin({ headers: { Authorization: `Basic ${auth}`} })
            .then(() => router.push('/'));

    };

    return (

        <Fragment>
            <HeadTag title={text_signin} />

            <SignLayout>
                <FormWrap title={text_signin_title}>
                    <form onSubmit={handleSubmit(handleReqData)}>
                        <FormRow
                            name="email"
                            errors={errors}
                        >
                            <input
                                type="text"
                                name="email"
                                placeholder={text_account_with_email}
                                {...register('email', { required: true })}
                            />
                        </FormRow>

                        <FormRow
                            name="password"
                            errors={errors}
                        >
                            <input
                                type="password"
                                name="password"
                                placeholder={text_password}
                                {...register('password', {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: error_password_at_least_eight,
                                    },
                                    // pattern: {
                                    //     value: /^(?=.*\d)[0-9a-zA-Z!\u0022#$%&'()*+,./:;<=>?@[\]\^_`{|}~-]{8,}$/g,
                                    //     message: error_pattern,
                                    // },
                                })}
                            />
                        </FormRow>

                        <div className="form-row form-row-btns">
                            <Buttons
                                type="submit"
                                text={text_signin}
                            />

                            <SigninGoogle />

                            <ForgotPasswordLayout>
                                <Links
                                    url="/forgot_password"
                                    title={text_forgot_password}
                                >
                                    {text_forgot_password}
                                </Links>
                            </ForgotPasswordLayout>

                            <BtnDirectLayout
                                type="third"
                                url="/register"
                                className="btn-register"
                                text={text_register}
                            />
                        </div>
                    </form>
                </FormWrap>
            </SignLayout>
        </Fragment>

    );

};

export default Signin;

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

};
