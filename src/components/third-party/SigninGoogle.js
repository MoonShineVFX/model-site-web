import GoogleLogin from 'react-google-login';
import Buttons from '../Buttons';
import deftag from '../../utils/util.deftag';

const {
    common: { text_login },
} = deftag;

const SigninGoogle = () => {

    const handleCallback = (response) => {

        console.log('response:', response);

    };

    return (

        <GoogleLogin
            clientId="440366749945-ufbv6jl00nqq79ancj5ip414hk9cuqaa.apps.googleusercontent.com"
            onSuccess={handleCallback}
            onFailure={handleCallback}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
            // buttonText={text_login} // 預設 google 按鈕
            render={({ disabled, onClick }) => (

                <Buttons
                    text={text_login}
                    disabled={disabled}
                    onClick={onClick}
                />

            )}
        />

    );

};

export default SigninGoogle;
