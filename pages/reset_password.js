import {
    Fragment,
    useRef,
    useContext,
    useEffect,
    useState,
} from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Buttons from '../src/components/Buttons';
import FontIcon from '../src/components/FontIcon';
import FormWrap, { FormRow, FormSuccessMesg } from '../src/components/FormWrap';

import HeadTag from '../src/containers/HeadTag';
import {
    SignLayout,
    BtnDirectLayout,
    ResetPasswordSuccessLayout,
} from '../src/components/member/memberSignLayout';

import { GlobalContext } from '../src/context/global.state';
import utilConst from '../src/utils/util.const';
import deftag from '../src/utils/util.deftag';
import Service from '../src/utils/util.service';

const { paswdConfig } = utilConst;

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
        watch,
    } = useForm();

    // useRef
    const password = useRef({});
    password.current = watch('password', '');

    // State
    const [success, setSuccess] = useState(false);
    const [toggle, setToggle] = useState({
        password: false,
        confirm: false,
    });

    // 顯示/隱藏密碼
    const handleToggle = (type) => {

        setToggle({
            ...toggle,
            [type]: !toggle[type],
        });

    };

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            ...router.query,
            uid: +router.query.uid,
        };

        delete reqData.confirm_password;
        Service.resetPassword(reqData)
            .then(() => setSuccess(true));

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
                                    className="row-password"
                                >
                                    <input
                                        type={paswdConfig[toggle.password].type}
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

                                     <span
                                        className="Model-y-align"
                                        onClick={() => handleToggle('password')}
                                    >
                                        <FontIcon icon={paswdConfig[toggle.password].icon} />
                                    </span>
                                </FormRow>

                                <FormRow
                                    name="confirm_password"
                                    errors={errors}
                                    className="row-password"
                                >
                                    <input
                                        type={paswdConfig[toggle.confirm].type}
                                        name="confirm_password"
                                        placeholder={text_confirm_password}
                                        {...register('confirm_password', {
                                            required: true,
                                            validate: (value) => (value === password.current) || error_password_different,
                                        })}
                                    />

                                    <span
                                        className="Model-y-align"
                                        onClick={() => handleToggle('confirm')}
                                    >
                                        <FontIcon icon={paswdConfig[toggle.confirm].icon} />
                                    </span>
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
