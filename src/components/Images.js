import PropTypes from 'prop-types';
import Image from 'next/image';

const Images = ({
    src,
    alt,
    width,
    height,
    ...rest
}) => (

    <Image
        // loader={({ src, w }) => `${src}?w=${w}`}
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="responsive"
        {...rest}
    />

);

Images.defaultProps = {
    alt: 'Moonshine Market',
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
};

export default Images;
