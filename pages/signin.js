import { Fragment } from 'react';
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

import deftag from '../src/utils/util.deftag';

const {
    memberSign: {
        text_signin,
        text_register,
        text_forgot_password,
        text_signin_title,
        text_account_with_email,
        text_password,
    },
} = deftag;

const Signin = () => {

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const handleReqData = (reqData) => {

        console.log('reqData:', reqData)

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
                                    // minLength: 8,
                                    // maxLength: 20,
                                    pattern: /^(?=.*\d)[0-9a-zA-Z!\u0022#$%&'()*+,./:;<=>?@[\]\^_`{|}~-]{8,}$/g,
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
                                <Links url="/forgotPassword">
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
