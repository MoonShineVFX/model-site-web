import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import Buttons from '../src/components/Buttons';
import Links from '../src/components/Links';
import Checkbox from '../src/components/Checkbox';
import FormWrap, { FormRow } from '../src/components/FormWrap';
import {
    SigninLayout,
    BtnRedirectLayout,
    ForgotPasswordLayout,
} from '../src/components/member/memberSignLayout';

import deftag from '../src/utils/util.deftag';

const {
    common: {
        text_register,
        text_confirm_password,
        btn_return_to_signin,
    },
    memberSign: {
        text_nick_name,
        text_real_name,
        text_account_with_email,
        text_enter_password,
        text_aggree_privacy,
    },
} = deftag;

const Register = () => {

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
            <FormWrap title={text_register}>
                <form onSubmit={handleSubmit(handleReqData)}>
                    <FormRow
                        name="nickName"
                        errors={errors}
                    >
                        <input
                            type="text"
                            name="nickName"
                            placeholder={text_nick_name}
                            {...register('nickName', { required: true })}
                        />
                    </FormRow>

                    <FormRow name="realName">
                        <input
                            type="text"
                            name="realName"
                            placeholder={text_real_name}
                            {...register('realName')}
                        />
                    </FormRow>

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
                            placeholder={text_enter_password}
                            {...register('password', {
                                required: true,
                                // minLength: 8,
                                // maxLength: 20,
                                pattern: /^(?=.*\d)[0-9a-zA-Z!\u0022#$%&'()*+,./:;<=>?@[\]\^_`{|}~-]{8,}$/g,
                            })}
                        />
                    </FormRow>

                    <FormRow
                        name="confirm_password"
                        errors={errors}
                    >
                        <input
                            type="password"
                            name="confirm_password"
                            placeholder={text_confirm_password}
                            {...register('confirm_password', { required: true })}
                        />
                    </FormRow>

                    <div className="form-row">
                        <Checkbox
                            name="aggree"
                            register={register('aggree')}
                        >
                            {text_aggree_privacy}
                        </Checkbox>
                    </div>

                    <div className="form-row form-row-btns">
                        <Buttons
                            type="submit"
                            text={text_register}
                        />

                        <ForgotPasswordLayout />

                        <BtnRedirectLayout
                            type="third"
                            url="/signin"
                            text={btn_return_to_signin}
                        />

                    </div>
                </form>
            </FormWrap>
        </SigninLayout>

    );

};

export default Register;
