import {
    Fragment,
    useRef,
    useContext,
    useEffect,
    useState,
} from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
    SignLayout,
    BtnDirectLayout,
    ResetPasswordSuccessLayout,
} from '../src/components/member/memberSignLayout';
import HeadTag from '../src/containers/HeadTag';
import Buttons from '../src/components/Buttons';
import FontIcon from '../src/components/FontIcon';
import FormWrap, { FormRow, FormSuccessMesg } from '../src/components/FormWrap';

import { GlobalContext } from '../src/context/global.state';
import utilConst from '../src/utils/util.const';
import Service from '../src/utils/util.service';
import useDeftags from '../src/utils/useDeftags';

const { paswdConfig } = utilConst;

const ResetPassword = () => {

    // Router
    const router = useRouter();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // Hook
    const [deftag] = useDeftags();

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
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
            <HeadTag title={deftag?.text_reset_password} />

            <SignLayout>
                <FormWrap
                    {...!success && { title: deftag?.text_reset_password }}
                >
                    {
                        success ? (

                            <ResetPasswordSuccessLayout>
                                <FormSuccessMesg mesg={deftag?.text_new_password_success} />

                                <div className="form-row form-row-btns">
                                    <BtnDirectLayout
                                        url="/signin"
                                        text={deftag?.btn_return_to_signin}
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
                                        placeholder={deftag?.text_new_password}
                                        {...register('password', {
                                            required: true,
                                            minLength: {
                                                value: 8,
                                                message: deftag?.error_password_at_least_eight,
                                            },
                                            pattern: {
                                                value: /^(?=.*\d)[0-9a-zA-Z!\u0022#$%&'()*+,./:;<=>?@[\]\^_`{|}~-]{8,}$/g,
                                                message: deftag?.error_pattern,
                                            },
                                        })}
                                    />

                                     <span onClick={() => handleToggle('password')}>
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
                                        placeholder={deftag?.text_confirm_password}
                                        {...register('confirm_password', {
                                            required: true,
                                            validate: (value) => (value === password.current) || deftag?.error_password_different,
                                        })}
                                    />

                                    <span onClick={() => handleToggle('confirm')}>
                                        <FontIcon icon={paswdConfig[toggle.confirm].icon} />
                                    </span>
                                </FormRow>

                                <div className="form-row form-row-btns">
                                    <Buttons
                                        type="submit"
                                        text={deftag?.btn_submit}
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
