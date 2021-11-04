import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Links } from './Links';
import util from '../utils/util';

const { priceWithCommas } = util;

//
const ItemLayout = styled(Links)(({ theme }) => ({
    color: theme.palette.textColor,
    textDecoration: 'none',
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
            height: '336px',
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
            height: '186px',
            borderRadius: '10px',
            overflow: 'hidden',
        },
    },
}));

//
const Item = ({
    newPage,
    type,
    url,
    width,
    height,
    data: { title, price, imgUrl }
}) => (

    <ItemLayout
        url={url}
        {...newPage && { target: '_blank'}}
        className={`item style-${type} Model-effect-brightness`}
    >
        <div className="item-thumb">
            <img
                src={imgUrl}
                alt={title}
                title={title}
                width={width}
                height={height}
            />
        </div>
        <div className="item-content">
            <h3 className="title">{title}</h3>
            {
                price &&
                    <span className="price">{priceWithCommas(price)}</span>
            }
        </div>
    </ItemLayout>

);

Item.defaultProps = {
    newPage: false, // 另開分頁
    type: 'section',
};

Item.propTypes = {
    newPage: PropTypes.bool,
    type: PropTypes.string, // section || product list
    url: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number,
        imgUrl: PropTypes.string.isRequired,
    }).isRequired,
};

export default Item;
