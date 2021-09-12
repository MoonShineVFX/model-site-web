import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FontIcon from './FontIcon';

let test;

const SlideshowBase = styled('section', {
    name: 'slideshowWrap',
})(() => ({
    position: 'relative',
}));

// 容器
const SlideshowContainer = styled('div', {
    name: 'slideshow-container',
})(({ theme }) => ({
    '.hide': {
        display: 'none',
    },
    '.active': {
        display: 'block'
    },
}));

// 點點
const Dots = styled('span', {
    name: 'slideshow-control-dots',
})(({ theme }) => ({
    position: 'absolute',
    bottom: '16px',
    '> *': {
        width: '8px',
        height: '8px',
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '50%',
        display: 'inline-block',
        margin: '2px 6px',
        cursor: 'pointer',
    },
    '.active': {
        backgroundColor: theme.palette.secondary.main,
    },
}));

// 箭頭
const Arrows = styled('span', {
    name: 'slideshow-control-arrows',
})(({ theme }) => ({
    '.MuiButton-root': {
        minWidth: 'auto',
        width: '60px',
        height: '60px',
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '50%',
        padding: 0,
        position: 'absolute',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
        '&:first-child': {
            left: '20px',
        },
        '& + .MuiButton-root': {
            right: '20px',
        },
    },
    'svg': {
        fontSize: '26px',
    },
}));

const Slideshow = ({
    active,
    data,
    showDot,
    handleArrowLeft,
    handleArrowRight,
    children,
}) => (

    <SlideshowBase>
        <SlideshowContainer>{children}</SlideshowContainer>

        {
            showDot &&
                <Dots className="Model-x-align">
                    {
                        data.map((obj, idx) => (
                            <span key={idx} className={(idx === active) ? 'active' : 'hide'}></span>
                        ))
                    }
                </Dots>
        }

        <Arrows>
            <Button
                active={active}
                className="Model-y-align"
                onClick={handleArrowLeft}
            >
                <FontIcon icon={faChevronLeft} />
            </Button>
            <Button
                active={active}
                className="Model-y-align"
                onClick={handleArrowRight}
            >
                <FontIcon icon={faChevronRight} />
            </Button>
        </Arrows>
    </SlideshowBase>

);

Slideshow.defaultProps = {
    data: [],
    showDot: false,
};

Slideshow.propTypes = {
    active: PropTypes.number.isRequired,
    data: PropTypes.array,
    showDot: PropTypes.bool,
    handleArrowLeft: PropTypes.func.isRequired,
    handleArrowRight: PropTypes.func.isRequired,
};

export default Slideshow;
