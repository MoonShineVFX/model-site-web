import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';
import { styled } from '@mui/system';

const PaginationLayout = styled(Pagination)(({ theme }) => ({
    justifyContent: 'center',
    marginTop: '100px',
    '.MuiPaginationItem-root': {
        color: theme.palette.textColor,
        opacity: 0.6,
    },
}));

const Paginations = ({
    length,
    perPage,
    currPage,
    ...rest
}) => (

    <PaginationLayout
        page={currPage}
        count={Math.ceil(length / perPage)}
        size="large"
        {...rest}
    />

);

Paginations.defaultProps = {
    currPage: 1,
    perPage: 40, // 一頁 40 筆
};

Paginations.propTypes = {
    length: PropTypes.number,
    perPage: PropTypes.number,
    currPage: PropTypes.number,
    showFirstButton: PropTypes.bool,
    showLastButton: PropTypes.bool,
};

export default Paginations;
