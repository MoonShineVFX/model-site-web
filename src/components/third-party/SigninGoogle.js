import { styled } from '@mui/system';
import GoogleLogin from 'react-google-login';
import Service from '../../utils/util.service';
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

    const handleCallback = (res) => {

        console.log('res:', res);
        Service.signWithGoogle({ access_token: res.accessToken })
            .then(() => {

                console.log('yahhhhh~~~');

            });

    };

    return (

        <GoogleSigninLayout
            clientId={process.env.NEXT_PUBLIC_GOOGLE_SIGNIN_CLIENTID}
            onSuccess={handleCallback}
            onFailure={handleCallback}
            // isSignedIn={true} // 已登入狀態
            cookiePolicy={'single_host_origin'}
            buttonText={text_signin_with_google} // 預設 google 按鈕
        />

    );

};

export default SigninGoogle;
