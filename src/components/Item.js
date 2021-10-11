import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Links } from './Links';
import util from '../utils/util';

const { priceWithCommas } = util;

const ItemLayout = styled(Links)(({ theme }) => ({
    color: theme.palette.textColor,
    textDecoration: 'none',
    marginBottom: '40px',
    filter: 'brightness(0.9)',
    transition: 'all .5s ease',
    '&:hover': {
        filter: 'brightness(1.2)',
    },
    '.thumb': {
        marginBottom: '16px'
    },
    'img': {
        width: '100%',
        borderRadius: '10px',
    },
    '.title': {
        fontWeight: 'normal',
        margin: 0,
    },
}));

const Item = ({ title, price, imgUrl, ...rest }) => (

    <ItemLayout className="item" {...rest}>
        <div className="thumb">
            <img src={imgUrl} alt={title} />
        </div>
        <h3 className="title">{title}</h3>
        <span className="price">{priceWithCommas(price)}</span>
    </ItemLayout>

);

Item.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
};

export default Item;
