import { styled } from '@mui/system';
import { ButtonLink } from '../Links';

// 登入
const SigninLayout = styled('section')(({ theme }) => ({
    marginTop: '80px',
    '.model-button': {
        '&:not(.btn-register .model-button)': {
            marginBottom: '30px',
        },
    },
}));

//
const ForgotPasswordLayout = styled('div')(({ theme }) => ({
    textAlign: 'center',
    borderBottom: `1px dashed ${theme.palette.border.dark}`,
    margin: '30px 0 50px',
    paddingBottom: '40px',
    'a': {
        fontSize: '1.15em',
        textDecoration: 'underline',
        color: theme.palette.textColor,
        opacity: '0.6',
    },
}));

//
const BtnRedirectLayout = styled(ButtonLink)({
    display: 'block',
});

export {
    SigninLayout,
    BtnRedirectLayout,
    ForgotPasswordLayout,
};
