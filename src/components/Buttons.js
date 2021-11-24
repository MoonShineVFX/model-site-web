import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';

//
const ButtonLayout = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    display: 'block',
    padding: '10px 18px',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
    '.MuiButton-endIcon': {
        textAlign: 'right',
        display: 'inline-block',
        flex: '0 0 20%',
        'svg': {
            fontSize: '18px',
            verticalAlign: 'middle',
        },
    },
}));

//
const Buttons = ({ text, children, ...rest }) => (

    <ButtonLayout
        {...rest}
        className="model-button"
        // endIcon={<ArrowForwardIosIcon />}
    >
        {text ? text : children}
    </ButtonLayout>

);

Buttons.defaultProps = {
    // text: '更多消息',
    // outline: true,
};

Buttons.propTypes = {
    text: PropTypes.string,
    children: PropTypes.any,
};

export default Buttons;
