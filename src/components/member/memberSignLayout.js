import { styled } from '@mui/system';
import { ButtonLink } from '../Links';

// 外層 form
const SignLayout = styled('section')(({ theme }) => ({
    marginTop: '80px',
    '.model-button': {
        marginBottom: '30px',
    },
}));

// 導頁按鈕
const BtnDirectLayout = styled(ButtonLink)(({ theme }) => ({
    display: 'block',
    borderTop: `1px dashed ${theme.palette.border.dark}`,
    marginTop: '50px',
    paddingTop: '50px',
}));

// 忘記密碼連結
const ForgotPasswordLayout = styled('div')(({ theme }) => ({
    textAlign: 'center',
    margin: '30px 0 -20px',
    'a': {
        fontSize: '1.15em',
        textDecoration: 'underline',
        color: theme.palette.textColor,
        opacity: '0.6',
    },
}));

export {
    SignLayout,
    BtnDirectLayout,
    ForgotPasswordLayout,
};
