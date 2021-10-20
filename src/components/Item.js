import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Links } from './Links';
import util from '../utils/util';

const { priceWithCommas } = util;

//
const ItemLayout = styled(Links)(({ theme }) => ({
    color: theme.palette.textColor,
    textDecoration: 'none',
    display: 'block',
    '.item-content': {
        padding: '16px 0',
    },
    '.title': {
        fontWeight: 'normal',
        margin: 0,
    },
    '&.style-section': {
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        '.item-thumb': {
            height: '328px',
        },
        '.item-content': {
            width: '100%',
            backgroundColor: '#000',
            paddingLeft: '24px',
            paddingRight: '24px',
            position: 'absolute',
            bottom: 0,
            opacity: .85,
        },
    },
    '&.style-product': {
        marginBottom: '20px',
        '.item-thumb': {
            height: '193px',
            borderRadius: '10px',
            overflow: 'hidden',
        },
    },
}));

//
const Item = ({ newPage, type, data: { title, price, imgUrl }, ...rest }) => (

    <ItemLayout
        {...rest}
        className={`item style-${type} Model-effect-brightness`}
        {...newPage && { target: '_blank'}}
    >
        <div
            className="item-thumb Model-bg-img"
            style={{
                backgroundImage: `url(${imgUrl})`,
            }}
        />
        <div className="item-content">
            <h3 className="title">{title}</h3>
            <span className="price">{priceWithCommas(price)}</span>
        </div>
    </ItemLayout>

);

Item.defaultProps = {
    // Betty: 開發中先給 false
    newPage: false, // 另開分頁
    type: 'section',
};

Item.propTypes = {
    newPage: PropTypes.bool,
    type: PropTypes.string, // section || product list
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imgUrl: PropTypes.string.isRequired,
    }).isRequired,
};

export default Item;
