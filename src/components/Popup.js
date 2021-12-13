import { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@mui/material';
import { styled } from '@mui/system';

//
const PopupLayout = styled(Popover)(({ theme }) => ({
    '.MuiPaper-root': {
        padding: '10px',
    },
}));

//
const Popup = ({ children, ...rest }) => {

    // State
    const [anchorEl, setAnchorEl] = useState(null);

    return (

        <PopupLayout
            {...rest}
            id={!!anchorEl ? 'simple-popover' : undefined}
            open={!!anchorEl}
            anchorEl={anchorEl}
            // onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            {children}
        </PopupLayout>

    );

};

// Popup.defaultProps = {
//     redirect: true,
// };

// Popup.propTypes = {
//     redirect: PropTypes.bool,
//     children: PropTypes.any,
// };

export default Popup;
