import { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Buttons from '../src/components/Buttons';
import Links from '../src/components/Links';
import Checkbox from '../src/components/Checkbox';
import FormWrap, { FormRow } from '../src/components/FormWrap';

import HeadTag from '../src/containers/HeadTag';
import {
    SignLayout,
} from '../src/components/member/memberSignLayout';

import deftag from '../src/utils/util.deftag';

const {
    common: {
        btn_submit,
    },
    memberSign: {
        text_reset_password,
        text_confirm_password,
        text_new_password,
    },
    error: {
        error_password_different,
        error_password_at_least_eight,
        error_pattern,
    },
} = deftag;

const Register = () => {

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm();

    // useRef
    const password = useRef({});
    password.current = watch('password', '');

    // 送資料
    const handleReqData = (reqData) => {

        console.log('reqData:', reqData)

    };

    return (

        <Fragment>
            <HeadTag title={text_reset_password} />

            <SignLayout>
                <FormWrap title={text_reset_password}>
                    <form onSubmit={handleSubmit(handleReqData)}>
                        <FormRow
                            name="password"
                            errors={errors}
                        >
                            <input
                                type="password"
                                name="password"
                                placeholder={text_new_password}
                                {...register('password', {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: error_password_at_least_eight,
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)[0-9a-zA-Z!\u0022#$%&'()*+,./:;<=>?@[\]\^_`{|}~-]{8,}$/g,
                                        message: error_pattern,
                                    },
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
                                {...register('confirm_password', {
                                    required: true,
                                    validate: (value) => (value === password.current) || error_password_different,
                                })}
                            />
                        </FormRow>

                        <div className="form-row form-row-btns">
                            <Buttons
                                type="submit"
                                text={btn_submit}
                            />
                        </div>
                    </form>
                </FormWrap>
            </SignLayout>
        </Fragment>

    );

};

export default Register;
