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
import Checkbox from '../src/components/Checkbox';
import FormWrap, { FormRow } from '../src/components/FormWrap';

import HeadTag from '../src/containers/HeadTag';
import {
    SignLayout,
    BtnDirectLayout,
    ForgotPasswordLayout,
} from '../src/components/member/memberSignLayout';

import { GlobalContext } from '../src/context/global.state';
import deftag from '../src/utils/util.deftag';
import Service from '../src/utils/util.service';

const {
    memberSign: {
        text_register,
        text_confirm_password,
        btn_return_to_signin,
        text_nickname,
        text_real_name,
        text_account_with_email,
        text_enter_password,
        text_agree_privacy,
    },
    error: {
        error_password_at_least_eight,
        error_password_different,
        error_pattern,
    },
} = deftag;

const Register = () => {

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
    const [disabled, setDisabled] = useState(true);

    // 我同意 checkbox
    const handleAgree = () => setDisabled(!disabled);

    // 送資料
    const handleReqData = (reqData) => {

        delete reqData.confirm_password;
        Service.register(reqData)
            .then(() => router.push('/'));

    };

    return (

        <Fragment>
            <HeadTag title={text_register} />
            <SignLayout>
                <FormWrap title={text_register}>
                    <form onSubmit={handleSubmit(handleReqData)}>
                        <FormRow
                            name="nickname"
                            errors={errors}
                        >
                            <input
                                type="text"
                                name="nickname"
                                placeholder={text_nickname}
                                {...register('nickname', { required: true })}
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

                        <div className="form-row">
                            <Checkbox
                                name="agree"
                                onChange={handleAgree}
                            >
                                {text_agree_privacy}
                            </Checkbox>
                        </div>

                        <div className="form-row form-row-btns">
                            <Buttons
                                type="submit"
                                text={text_register}
                                disabled={disabled}
                            />

                            <ForgotPasswordLayout />

                            <BtnDirectLayout
                                type="third"
                                url="/signin"
                                text={btn_return_to_signin}
                            />
                        </div>
                    </form>
                </FormWrap>
            </SignLayout>
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
