import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';
import { styled } from '@mui/system';
import Logo from './Logo';
import deftag from '../utils/util.deftag';

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
    '.form-row:not(.form-row-btns)': {
        marginBottom: '30px',
    },
}));

//
const FormRowLayout = styled('div')(({ theme }) => ({
    'input': {
        width: '100%',
        fontSize: '1.15em',
        color: theme.palette.textColor,
        backgroundColor: theme.palette.bgColor,
        border: '0',
        borderRadius: '40px',
        padding: '20px 40px',
        outline: '0',
        '&::placeholder, &::-ms-input-placeholder': {
            color: theme.palette.textColor,
            opacity: '1',
        },
    },
    '.error-mesg': {
        fontSize: '0.8em',
        marginTop: '8px',
        paddingLeft: '40px',
    },
}));

//
const SuccessMesgLayout = styled('p')(({ theme }) => ({
    fontSize: '1.15em',
    textAlign: 'center',
}));

//
const FormWrap = ({ title, children, ...rest }) => (

    <FormWrapLayout className="Model-form-button formWrap" {...rest}>
        <div className="form-top">
            <Logo redirect={false} />
            <h3 className="title">{title}</h3>
        </div>

        {children}
    </FormWrapLayout>

);

//
const FormRow = ({ name, errors, children, ...rest }) => (

    <FormRowLayout
        className="form-row"
        {...rest}
    >
        {children}

        {
            errors &&
                <FormErrorMesg
                    name={name}
                    errors={errors}
                />
        }
    </FormRowLayout>

);

// 錯誤訊息
const FormErrorMesg = ({ name, errors }) => (

    <ErrorMessage
        name={name}
        errors={errors}
        message={deftag.error[`error_${errors[name]?.type}`]}
        render={({ message }) => <p className="error-mesg">{message}</p>}
    />

);

// 成功訊息
const FormSuccessMesg = ({ mesg }) => (

    <SuccessMesgLayout>{mesg}</SuccessMesgLayout>

);

FormWrap.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};

FormRow.propTypes = {
    name: PropTypes.string.isRequired,
    errors: PropTypes.object,
    children: PropTypes.any,
};

FormErrorMesg.propTypes = {
    name: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
};

export {
    FormWrap as default,
    FormRow,
    FormErrorMesg,
    FormSuccessMesg,
};
