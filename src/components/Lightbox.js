import { useContext } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { GlobalContext } from '../context/global.state';

const DialogLayout = styled(Dialog)(({ theme }) => ({
    '.MuiTypography-root': {
        fontWeight: 'bold',
    },
    '.MuiDialog-paper': {
        width: '100%',
    },
    '.MuiDialogContent-root': {
        minHeight: '50px',
        fontSize: '1em',
    },
    '.MuiButton-text': {
        fontSize: '15px',
    },
}));

// confirm
// alert
// form

// 關閉按鈕
const CloseButton = ({ onClick }) => (

    <IconButton
        aria-label="close"
        onClick={onClick}
        sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
        }}
    >
        <CloseIcon />
    </IconButton>

);

const Lightbox = (props) => {

    const {
        type,
        title,
        children,
        btnTextCancel,
        btnTextSubmit,
        onClick,
    } = props;

    // Context
    const {
        visible,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // Close
    const handleClose = () => lightboxDispatch({ type: 'HIDE' });

    return (

        // type === 'confirm' ? ()

        <DialogLayout
            maxWidth="xs"
            open={visible}
            {
                ...type && (type !== 'confirm') && {
                    onClose: handleClose
                }
            }
        >
            <DialogTitle>
                {title}
                {(type !== 'confirm') && <CloseButton onClick={handleClose} />}
            </DialogTitle>

            <DialogContent dividers>
                {children}
            </DialogContent>

            <DialogActions>
                <Button
                    autoFocus
                    onClick={handleClose}
                >
                    {btnTextCancel}
                </Button>

                <Button
                    type="submit"
                    {...type && (type === 'confirm') && { onClick }}
                >
                    {btnTextSubmit}
                </Button>
            </DialogActions>
        </DialogLayout>

    );

};

Lightbox.defaultProps = {
    title: '確認要更新?',
    btnTextCancel: '取消',
    btnTextSubmit: '確認',
};

Lightbox.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    btnTextCancel: PropTypes.string,
    btnTextSubmit: PropTypes.string,
    onClick: PropTypes.func,
};

export default Lightbox;
