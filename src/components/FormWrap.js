import PropTypes from 'prop-types';
import Link from 'next/link';
import { ErrorMessage } from '@hookform/error-message';
import { styled } from '@mui/system';
import Logo from './Logo';
import deftag from '../utils/util.deftag';

const { error: { error_required } } = deftag;

//
const FormWrapLayout = styled('div')(({ theme }) => ({
    maxWidth: '560px',
    fontSize: '1.2em',
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    margin: 'auto',
    padding: '40px',
    '.form-top': {
        textAlign: 'center',
    },
    '.title': {
        fontWeight: 'normal',
        margin: '16px 0 36px',
        opacity: '0.6',
    },
    '.model-button': {
        width: '100%',
        fontSize: '1.15em',
    },
    '.form-row': {
        // width: '100%',
        // fontSize: '1.15em',
        border: '1px solid',
        marginBottom: '24px',
    },
}));

//
const FormWrap = ({ title, children, ...rest }) => (

    <FormWrapLayout className="formWrap" {...rest}>
        <div className="form-top">
            <Logo redirect={false} />
            <h3 className="title">{title}</h3>
        </div>

        {children}
    </FormWrapLayout>

);

// 錯誤訊息
const FormErrorMesg = ({ name, errors }) => (

    <ErrorMessage
        name={name}
        errors={errors}
        message={error_required}
        render={({ message }) => <div>{message}</div>}
    />

);

// FormWrap.defaultProps = {
//     url: '',
//     newPage: false,
// };

FormWrap.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};

export {
    FormWrap as default,
    FormErrorMesg,
};
