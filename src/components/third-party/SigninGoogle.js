import { useContext } from 'react';
import { styled } from '@mui/system';
import GoogleLogin from 'react-google-login';
import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import Service from '../../utils/util.service';

const { redirectTo } = util;

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

    // Context
    const { deftags } = useContext(GlobalContext);

    //
    const handleCallback = (res) => {

        Service.signWithGoogle({ access_token: res.accessToken })
            .then(redirectTo);

    };

    return (

        <GoogleSigninLayout
            clientId={process.env.NEXT_PUBLIC_GOOGLE_SIGNIN_CLIENTID}
            onSuccess={handleCallback}
            onFailure={handleCallback}
            // isSignedIn={true} // 已登入狀態
            cookiePolicy={'single_host_origin'}
            buttonText={deftags.text_signin_with_google} // 預設 google 按鈕
        />

    );

};

export default SigninGoogle;
