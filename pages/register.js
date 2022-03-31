import {
    Fragment,
    useRef,
    useContext,
    useEffect,
    useState,
} from 'react';

import { useForm } from 'react-hook-form';

import {
    SignLayout,
    BtnDirectLayout,
    AggreeLayout,
    ForgotPasswordLayout,
} from '../src/components/member/memberSignLayout';
import HeadTag from '../src/containers/HeadTag';
import Buttons from '../src/components/Buttons';
import Checkbox from '../src/components/Checkbox';
import FormWrap, { FormRow } from '../src/components/FormWrap';
import FontIcon from '../src/components/FontIcon';
import Lightbox from '../src/components/Lightbox';

import { GlobalContext } from '../src/context/global.state';
import utilConst from '../src/utils/util.const';
import Service from '../src/utils/util.service';
import useDeftags from '../src/utils/useDeftags';

const { paswdConfig } = utilConst;

const Register = () => {

    // Context
    const { visible, globalDispatch, lightboxDispatch } = useContext(GlobalContext);

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
    const [disabled, setDisabled] = useState(true);
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

    // 我同意 checkbox
    const handleAgree = () => setDisabled(!disabled);

    // 送資料
    const handleReqData = (reqData) => {

        delete reqData.confirm_password;
        Service.register(reqData)
            .then(() => lightboxDispatch({ type: 'SHOW' }));

    };

    return (

        <Fragment>
            <HeadTag title={deftag?.text_register} />
            <SignLayout>
                <FormWrap title={deftag?.text_register}>
                    <form onSubmit={handleSubmit(handleReqData)}>
                        <FormRow
                            name="nickname"
                            errors={errors}
                        >
                            <input
                                type="text"
                                name="nickname"
                                placeholder={deftag?.text_nickname}
                                {...register('nickname', { required: true })}
                            />
                        </FormRow>

                        <FormRow name="realName">
                            <input
                                type="text"
                                name="realName"
                                placeholder={deftag?.text_real_name}
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
                                placeholder={deftag?.text_enter_password}
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

                        <div className="form-row">
                            <Checkbox
                                name="agree"
                                onChange={handleAgree}
                            >
                                <AggreeLayout url="/privacy" newPage>{deftag?.text_agree_privacy}</AggreeLayout>
                            </Checkbox>
                        </div>

                        <div className="form-row form-row-btns">
                            <Buttons
                                type="submit"
                                text={deftag?.text_register}
                                disabled={disabled}
                            />

                            <ForgotPasswordLayout />

                            <BtnDirectLayout
                                type="third"
                                url="/signin"
                                text={deftag?.btn_return_to_signin}
                            />
                        </div>
                    </form>
                </FormWrap>
            </SignLayout>

            {
                visible &&
                    <Lightbox
                        type="success"
                        onClick={() => lightboxDispatch({ type: 'HIDE' })}
                    >
                        {deftag?.text_register_success_message}
                    </Lightbox>
            }
        </Fragment>

    );

};

export default Register;

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
