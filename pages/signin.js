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
import ReCaptcha from '../src/components/ReCaptcha';
import FormWrap, { FormRow } from '../src/components/FormWrap';
import SigninGoogle from '../src/components/third-party/SigninGoogle';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import utilConst from '../src/utils/util.const';
import deftag from '../src/utils/util.deftag';
import Service from '../src/utils/util.service';

const { redirectTo } = util;
const { paswdConfig } = utilConst;
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
        Service.signin({ headers: { Authorization: `Basic ${auth}`} })
            .then(redirectTo);

    };

    return (

        <Fragment>
            <HeadTag title={text_signin} />
            <ReCaptcha />

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
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.password].type}
                                name="password"
                                placeholder={text_password}
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

                            <span onClick={() => handleToggle('password')}>
                                <FontIcon icon={paswdConfig[toggle.password].icon} />
                            </span>
                        </FormRow>

                        <div className="form-row form-row-btns">
                            <Buttons
                                type="submit"
                                text={text_signin}
                            />

                            {/* <SigninGoogle /> */}

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
