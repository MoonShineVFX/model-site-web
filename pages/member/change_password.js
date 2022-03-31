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
import Service from '../../src/utils/util.service';
import useDeftags from '../../src/utils/useDeftags';

const { redirectTo } = util;
const { paswdConfig } = utilConst;
const goToAccount = '/member/account';

const ChangePassword = () => {

    // Context
    const { visible, globalDispatch, lightboxDispatch } = useContext(GlobalContext);

    // Hook
    const [deftag] = useDeftags();

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
            <HeadTag title={deftag?.member_change_password} />

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
                                placeholder={deftag?.member_old_password}
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
                            name="newPassword"
                            errors={errors}
                            className="row-password"
                        >
                            <input
                                type={paswdConfig[toggle.newPassword].type}
                                name="newPassword"
                                placeholder={deftag?.text_new_password}
                                {...register('newPassword', {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: deftag?.error_password_at_least_eight,
                                    },
                                    validate: (value) => (value === password.current) || deftag?.error_password_different,
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
                                placeholder={deftag?.text_confirm_password}
                                {...register('confirmNewPassword', {
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

                            <BtnDirectLayout
                                type="third"
                                url={goToAccount}
                                text={deftag?.text_return_to_account}
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
                        {deftag?.member_change_password_success}
                    </Lightbox>
            }
        </Fragment>

    );

};

export default ChangePassword;
