import PropTypes from 'prop-types';
import { styled } from '@mui/system';

//
const BoxLayout = styled('div')(({ theme }) => ({
    fontSize: '1em',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    position: 'absolute',
    top: '50px',
    zIndex: '10',
}));

//
const Box = ({ children, ...rest }) => (

    <BoxLayout {...rest}>
        {children}
    </BoxLayout>

);

// Box.defaultProps = {
//     redirect: true,
// };

// Box.propTypes = {
//     redirect: PropTypes.bool,
//     children: PropTypes.any,
// };

export default Box;
