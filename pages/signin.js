import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import SigninGoogle from '../src/components/third-party/SigninGoogle';
import Buttons from '../src/components/Buttons';
import Links from '../src/components/Links';
import FormWrap, { FormRow } from '../src/components/FormWrap';
import {
    SigninLayout,
    BtnRedirectLayout,
    ForgotPasswordLayout,
} from '../src/components/member/memberSignLayout';

import deftag from '../src/utils/util.deftag';

const {
    common: {
        text_signin,
        text_register,
        text_forgot_password,
    },
    memberSign: {
        text_signin_title,
        text_account,
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

        <SigninLayout>
            <FormWrap title={text_signin_title}>
                <form onSubmit={handleSubmit(handleReqData)}>
                    <FormRow
                        name="email"
                        errors={errors}
                    >
                        <input
                            type="text"
                            name="email"
                            placeholder={text_account}
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
                            <Links url="/forgot">
                                {text_forgot_password}
                            </Links>
                        </ForgotPasswordLayout>

                        <BtnRedirectLayout
                            type="third"
                            url="/register"
                            className="btn-register"
                            text={text_register}
                        />
                    </div>
                </form>
            </FormWrap>
        </SigninLayout>

    );

};

export default Signin;
