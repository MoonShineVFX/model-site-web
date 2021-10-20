import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { ButtonLink } from '../components/Links';

//
const ItemsTitle = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    '> *': {
        flex: 1,
    },
    'h2': {
        fontSize: '1.4em',
        fontWeight: 'normal',
        '& + div': {
            textAlign: 'right',
            flex: '0 0 20%',
        },
    },
}));

//
const ItemsWrap = ({
    title,
    showMore,
    url,
    children,
    ...rest
}) => (

    <section {...rest}>
        <ItemsTitle>
            <h2>{title}</h2>
            <div>
                {
                    showMore &&
                        <ButtonLink
                            url={url}
                            text="顯示更多"
                            type="third"
                        />
                }
            </div>
        </ItemsTitle>

        {children}
    </section>

);

ItemsWrap.defaultProps = {
    showMore: true,
};

ItemsWrap.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    url: PropTypes.string,
    children: PropTypes.any.isRequired,
};

export default ItemsWrap;
