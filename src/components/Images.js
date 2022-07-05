import PropTypes from 'prop-types';
import Image from 'next/image';

const Images = ({
    src,
    alt,
    width,
    height,
    isOrigin,
    isBlur,
    ...rest
}) => (

    <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        {
            ...isOrigin
                ? { loader: ({ src, w }) => `${src}?w=${w}` }
                : { layout: 'responsive' }
        }
        {
            ...isBlur && {
                placeholder: 'blur',
                blurDataURL: src,
            }
        }
        {...rest}
    />

);

Images.defaultProps = {
    alt: 'Moonshine Market',
    isOrigin: false,
    isBlur: false,
};

Images.propTypes = {
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
    isOrigin: PropTypes.bool,
    isBlur: PropTypes.bool,
};

export default Images;
