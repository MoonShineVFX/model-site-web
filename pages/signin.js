import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import SigninGoogle from '../src/components/third-party/SigninGoogle';
import Buttons from '../src/components/Buttons';
import FormWrap, { FormErrorMesg } from '../src/components/FormWrap';
// import {  } from '../src/components/member/memberSignLayout';

import deftag from '../src/utils/util.deftag';

const {
    common: { text_signin },
    memberSign: {
        text_signin_title,
        text_account,
    },
} = deftag;

const Signin = () => {

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const handleReqData = (reqData) => {

        console.log('reqData:', reqData)

    };

    console.log('errors:', errors)

    return (

        <section>
            <FormWrap title={text_signin_title}>
                <form onSubmit={handleSubmit(handleReqData)}>
                    <div className="form-row">
                        <input
                            type="text"
                            name="email"
                            placeholder={text_account}
                            {...register('email', { required: true })}
                        />

                        <FormErrorMesg
                            name="email"
                            errors={errors}
                        />
                    </div>

                    <Buttons
                        type="submit"
                        text={text_signin}
                    />
                </form>
            </FormWrap>

            {/* <SigninGoogle /> */}
        </section>

    );

};

export default Signin;
