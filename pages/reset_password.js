import {
    Fragment,
    useRef,
    useContext,
    useEffect,
    useState,
} from 'react';

import { useForm } from 'react-hook-form';
import Buttons from '../src/components/Buttons';
import FormWrap, { FormRow, FormSuccessMesg } from '../src/components/FormWrap';

import HeadTag from '../src/containers/HeadTag';
import {
    SignLayout,
    BtnDirectLayout,
    ResetPasswordSuccessLayout,
} from '../src/components/member/memberSignLayout';

import { GlobalContext } from '../src/context/global.state';
import deftag from '../src/utils/util.deftag';

const {
    common: {
        btn_submit,
    },
    memberSign: {
        text_reset_password,
        text_confirm_password,
        text_new_password,
        text_new_password_success,
        btn_return_to_signin,
    },
    error: {
        error_password_different,
        error_password_at_least_eight,
        error_pattern,
    },
} = deftag;

const ResetPassword = () => {

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
        watch,
    } = useForm();

    // useRef
    const password = useRef({});
    password.current = watch('password', '');

    // State
    const [success, setSuccess] = useState(false);

    // 送資料
    const handleReqData = (reqData) => {

        console.log('reqData:', reqData)
        setSuccess(true);

    };

    return (

        <Fragment>
            <HeadTag title={text_reset_password} />

            <SignLayout>
                <FormWrap
                    {...!success && { title: text_reset_password }}
                >
                    {
                        success ? (

                            <ResetPasswordSuccessLayout>
                                <FormSuccessMesg mesg={text_new_password_success} />

                                <div className="form-row form-row-btns">
                                    <BtnDirectLayout
                                        url="/signin"
                                        text={btn_return_to_signin}
                                        className="reset-pawd-success"
                                    />
                                </div>
                            </ResetPasswordSuccessLayout>

                        ) : (

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

                        )
                    }
                </FormWrap>
            </SignLayout>
        </Fragment>

    );

};

export default ResetPassword;
