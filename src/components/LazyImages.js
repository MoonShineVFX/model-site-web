import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Loading from './Loading';

// dynamic
const Images = dynamic(() => import('./Images'), {
    loading: () => <Loading />,
    ssr: false,
});

const LazyImages = ({ src, alt, width, height, ...rest }) => (

    <Images
        src={src}
        alt={alt}
        width={width}
        height={height}
        {...rest}
    />

);

LazyImages.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.any.isRequired,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default LazyImages;
