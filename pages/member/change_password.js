import {
    Fragment,
    useRef,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useForm } from 'react-hook-form';

import { SignLayout, BtnDirectLayout } from '../../src/components/member/memberSignLayout';
import HeadTag from '../../src/containers/HeadTag';
import Buttons from '../../src/components/Buttons';
import FontIcon from '../../src/components/FontIcon';
import FormWrap, { FormRow } from '../../src/components/FormWrap';
import Lightbox from '../../src/components/Lightbox';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import utilConst from '../../src/utils/util.const';
import deftag from '../../src/utils/util.deftag';
import Service from '../../src/utils/util.service';

const { redirectTo } = util;
const { paswdConfig } = utilConst;
const {
    common: {
        btn_submit,
    },
    memberSign: {
        text_confirm_password,
        text_new_password,
    },
    member: {
        text_old_password,
        text_change_password,
        text_change_password_success,
        btn_return_to_account,
    },
    error: {
        error_password_different,
        error_password_at_least_eight,
        error_pattern,
    },
} = deftag;
const goToAccount = '/member/account';

const ChangePassword = () => {

    // Context
    const { visible, globalDispatch, lightboxDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });
        lightboxDispatch({ type: 'HIDE' }); // reset lightbox state

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
    password.current = watch('newPassword', '');

    // State
    const [toggle, setToggle] = useState({
        password: false,
        newPassword: false,
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

        Service.changePassword(reqData)
            .then(() => lightboxDispatch({ type: 'SHOW' }));

    };

    return (

        <Fragment>
            <HeadTag title={text_change_password} />

            <SignLayout>
                <FormWrap>
                    <form onSubmit={handleSubmit(handleReqData)}>
                        <FormRow
                            name="password"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.password].type}
                                name="password"
                                placeholder={text_old_password}
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

                        <FormRow
                            name="newPassword"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.newPassword].type}
                                name="newPassword"
                                placeholder={text_new_password}
                                {...register('newPassword', {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: error_password_at_least_eight,
                                    },
                                    validate: (value) => (value === password.current) || error_password_different,
                                })}
                            />

                            <span onClick={() => handleToggle('newPassword')}>
                                <FontIcon icon={paswdConfig[toggle.newPassword].icon} />
                            </span>
                        </FormRow>

                        <FormRow
                            name="confirmNewPassword"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.confirm].type}
                                name="confirmNewPassword"
                                placeholder={text_confirm_password}
                                {...register('confirmNewPassword', {
                                    required: true,
                                    validate: (value) => (value === password.current) || error_password_different,
                                })}
                            />

                            <span onClick={() => handleToggle('confirm')}>
                                <FontIcon icon={paswdConfig[toggle.confirm].icon} />
                            </span>
                        </FormRow>

                        <div className="form-row form-row-btns">
                            <Buttons
                                type="submit"
                                text={btn_submit}
                            />

                            <BtnDirectLayout
                                type="third"
                                url={goToAccount}
                                text={btn_return_to_account}
                            />
                        </div>
                    </form>
                </FormWrap>
            </SignLayout>

            {
                visible &&
                    <Lightbox
                        type="success"
                        onClick={() => redirectTo(goToAccount, false)}
                    >
                        {text_change_password_success}
                    </Lightbox>
            }
        </Fragment>

    );

};

export default ChangePassword;
