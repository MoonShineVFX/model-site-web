import PropTypes from 'prop-types';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import FontIcon from './FontIcon';

const Loading = () => (

    <FontIcon
        icon={faSpinner}
        size="2x"
        spin
    />

);

export default Loading;
