import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useForm } from 'react-hook-form';

import {
    SignLayout,
    BtnDirectLayout,
    ForgotPasswordLayout,
} from '../src/components/member/memberSignLayout';
import HeadTag from '../src/containers/HeadTag';
import Buttons from '../src/components/Buttons';
import FontIcon from '../src/components/FontIcon';
import Links from '../src/components/Links';
import FormWrap, { FormRow } from '../src/components/FormWrap';
import SigninGoogle from '../src/components/third-party/SigninGoogle';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import utilConst from '../src/utils/util.const';
import Service from '../src/utils/util.service';
import useReCaptchaVerify from '../src/utils/useReCaptchaVerify';
import useDeftags from '../src/utils/useDeftags';

const { redirectTo } = util;
const { paswdConfig } = utilConst;

const Signin = () => {

    // Context
    const { isVerified, globalDispatch } = useContext(GlobalContext);

    // Hook
    const [token, handleGetToken] = useReCaptchaVerify(null);
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
    } = useForm();

    // State
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

        let auth = btoa(`${reqData.email}:${reqData.password}`);
        Service.signin({
            reqData: { recaptcha: token },
            headers: { Authorization: `Basic ${auth}`},
        }).then(redirectTo);

    };

    return (

        <Fragment>
            <HeadTag title={deftag?.text_signin} />

            <SignLayout>
                <FormWrap title={deftag?.text_signin_title}>
                    <form onSubmit={handleSubmit(handleReqData)}>
                        <FormRow
                            name="email"
                            errors={errors}
                        >
                            <input
                                type="text"
                                name="email"
                                placeholder={deftag?.text_account}
                                {...register('email', { required: true })}
                            />
                        </FormRow>

                        <FormRow
                            name="password"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.password].type}
                                name="password"
                                placeholder={deftag?.text_password}
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

                        <div className="form-row form-row-btns">
                            <Buttons
                                text={deftag?.btn_verify}
                                disabled={isVerified}
                                onClick={handleGetToken}
                            />

                            <Buttons
                                type="submit"
                                text={deftag?.text_signin}
                                disabled={!isVerified}
                            />

                            <SigninGoogle />

                            <ForgotPasswordLayout>
                                <Links
                                    url="/forgot_password"
                                    title={deftag?.text_forgot_password}
                                >
                                    {deftag?.text_forgot_password}
                                </Links>
                            </ForgotPasswordLayout>

                            <BtnDirectLayout
                                type="third"
                                url="/register"
                                className="btn-register"
                                text={deftag?.text_register}
                            />
                        </div>
                    </form>
                    {/* <p>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p> */}
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
