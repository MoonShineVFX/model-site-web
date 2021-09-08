import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const LinkText = ({ url, text }) => (

    <Button>
        <Link href={`/${url}`}>
            <a href={`/${url}`}>{text}</a>
        </Link>
    </Button>

);

LinkText.defaultProps = {
    url: '',
    text: '回首頁',
};

LinkText.propTypes = {
    url: PropTypes.string,
    text: PropTypes.string,
};

export default LinkText;
