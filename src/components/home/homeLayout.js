import { GlobalStyles } from '@mui/material';
import { styled } from '@mui/system';
import SlideShow from '../Slideshow';

const styles = {
    'main > div > *': {
        marginBottom: '80px',
    },
};

// Home Style
const homeStyles = <GlobalStyles styles={styles} />;

//
const SlideShowWrapLayout = styled(SlideShow)({
    '.slideshow-control-arrows': {
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        '.MuiButton-root': {
            width: '34px',
            height: '34px',
            minHeight: 'initial',
            position: 'initial',
            transform: 'initial',
            '&:first-of-type': {
                marginRight: '16px',
            },
        },
        'svg': {
            fontSize: '1em',
        },
    },
});

//
const SlideShowItemLayout = styled('div')(({ theme }) => ({
    '.inner': {
        lineHeight: '1.8',
        maxHeight: '386px',
        borderRadius: theme.borderRadius,
        display: 'flex',
        overflow: 'hidden',
    },
    '.item': {
        width: '840px',
        height: '100%',
    },
    '.price': {
        fontSize: '1.15em',
        color: theme.palette.primary.main,
    },
}));

//
const SlideshowInfoLayout = styled('div')(({ theme }) => ({
    flex: '0 0 calc(100% - 840px)',
    backgroundColor: theme.palette.card.main,
    padding: '30px 36px',
    position: 'relative',
}));

//
const ItemTutorialLayout = styled('div')(({ theme }) => ({
    '.itemWrap': {
        color: theme.palette.textColor,
        backgroundColor: theme.palette.card.main,
        textDecoration: 'none',
        borderRadius: '16px',
        display: 'flex',
        marginBottom: '30px',
        overflow: 'hidden',
        transition: 'all .5s ease',
        '&:hover': {
            backgroundColor: theme.palette.card.light,
        },
    },
    '.item-thumb': {
        height: '206px',
    },
    '.item-content': {
        lineHeight: '1.8',
        padding: '30px 40px',
        flex: 1,
    },
    '.title': {
        fontSize: '1.3em',
        marginTop: 0,
        marginBottom: '24px',
    },
    'p': {
        fontSize: '1.15em',
    },
}));

export {
    homeStyles,
    SlideShowWrapLayout,
    SlideShowItemLayout,
    SlideshowInfoLayout,
    ItemTutorialLayout,
};
