import { styled } from '@mui/system';
import GoogleLogin from 'react-google-login';
import deftag from '../../utils/util.deftag';

const {
    memberSign: { text_signin_with_google },
} = deftag;

//
const GoogleSigninLayout = styled(GoogleLogin)({
    width: '100%',
    height: '70px',
    borderRadius: '40px !important',
    justifyContent: 'center',
    'span': {
        fontSize: '1.45em',
    },
    'svg': {
        verticalAlign: 'middle',
    },
});

//
const SigninGoogle = () => {

    const handleCallback = (response) => {

        console.log('response:', response);

    };

    return (

        <GoogleSigninLayout
            clientId="440366749945-ufbv6jl00nqq79ancj5ip414hk9cuqaa.apps.googleusercontent.com"
            onSuccess={handleCallback}
            onFailure={handleCallback}
            // isSignedIn={true} // 已登入狀態
            cookiePolicy={'single_host_origin'}
            buttonText={text_signin_with_google} // 預設 google 按鈕
        />

    );

};

export default SigninGoogle;
