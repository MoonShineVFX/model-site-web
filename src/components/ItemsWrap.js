import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { ButtonLink } from '../components/Links';
import useDeftags from '../utils/useDeftags';

//
const ItemsTitle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    '> *': {
        flex: '2',
    },
    '.title': {
        fontSize: '1.4em',
        margin: '0',
        '& + div': {
            textAlign: 'right',
            flex: '1',
        },
    },
    [theme.breakpoints.down('mobile')]: {
        '.title': {
            fontSize: '1.2em',
            opacity: '0.79',
            '& + div': {
                fontSize: '0.9em',
            },
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
}) => {

    // Hook
    const [deftag] = useDeftags();

    return (

        <section {...rest}>
            <ItemsTitle>
                <h2 className="title">{title}</h2>
                {
                    showMore &&
                        <ButtonLink
                            url={url}
                            text={deftag?.btn_show_more}
                            type="third"
                        />
                }
            </ItemsTitle>

            {children}
        </section>

    );

};

ItemsWrap.defaultProps = {
    showMore: true,
};

ItemsWrap.propTypes = {
    title: PropTypes.string,
    showMore: PropTypes.bool,
    url: PropTypes.string,
    children: PropTypes.any.isRequired,
};

export default ItemsWrap;
