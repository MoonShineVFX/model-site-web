import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
    TitleLayout,
    SectionLayout,
    CartLayout,
} from './member/cartLayout';
import HeadTag from '../containers/HeadTag';
import { ButtonLink } from './Links';

//
const ResultLayout = styled(CartLayout)(({ theme }) => ({
    minHeight: '200px',
    fontSize: '1.2em',
    textAlign: 'center',
    padding: '40px 80px 80px',
    '.btn-linkTo': {
        width: '100%',
    },
    '.model-button': {
        marginTop: '20px',
    },
}));

//
const Result = ({
    title,
    message,
    btnText,
    linkTo,
}) => (

    <Fragment>
        <HeadTag title={title} />
        <TitleLayout>{title}</TitleLayout>

        <SectionLayout>
            <ResultLayout>
                <p>{message}</p>

                <ButtonLink
                    url={linkTo}
                    className="btn-linkTo"
                    text={btnText}
                />
            </ResultLayout>
        </SectionLayout>
    </Fragment>

);

Result.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    btnText: PropTypes.string,
    linkTo: PropTypes.string.isRequired,
};

export default Result;
