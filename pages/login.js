import { Fragment } from 'react';
import GoogleLogin from 'react-google-login';
import Buttons from '../src/components/Buttons';
import deftag from '../src/utils/util.deftag';

const {
    common: {
        btn_login,
        btn_submit,
    },
} = deftag;

const Login = () => {

    const handleGoogleCallback = (response) => {

        console.log('response:', response);

    };

    return (

        <GoogleLogin
            clientId="440366749945-ufbv6jl00nqq79ancj5ip414hk9cuqaa.apps.googleusercontent.com"
            onSuccess={handleGoogleCallback}
            onFailure={handleGoogleCallback}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
            // buttonText={btn_login} // 預設 google 按鈕
            render={({ disabled, onClick }) => (

                <Buttons
                    text={btn_login}
                    disabled={disabled}
                    onClick={onClick}
                />

            )}
        />

    );

};

export default Login;
