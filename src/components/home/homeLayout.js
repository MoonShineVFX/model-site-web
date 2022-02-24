import { GlobalStyles, Grid } from '@mui/material';
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
const BannerWrapLayout = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        marginBottom: '40px',
        '.slideshow-control-arrows': {
            display: 'none',
        },
        '.container': {
            display: 'flex',
            overflowX: 'auto',
        },
        '.item': {
            display: 'block !important',
            ':not(:last-child)': {
                marginRight: '30px',
            },
        },
        '.inner': {
            width: 'calc(100vw - 90px)',
            position: 'relative',
            flexWrap: 'wrap',
            'a': {
                maxWidth: 'none',
            },
            '> div': {
                width: 'calc(100% - 20px)',
                height: '10vh',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '50px',
                padding: '10px 16px',
                position: 'absolute',
                left: '50%',
                bottom: '10px',
                transform: 'translateX(-50%)',
                opacity: '0.82',
                display: '-webkit-box',
                WebkitLineClamp: theme.lineClamp(),
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
            },
        },
    },
    [theme.breakpoints.down('mobile')]: {
        '.item': {
            ':not(:last-child)': {
                marginRight: '20px',
            },
        },
        '.inner': {
            width: 'calc(100vw - 120px)',
            'a': {
                maxHeight: '300px',
            },
            '> div': {
                height: '8vh',
            },
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.inner': {
            width: 'calc(100vw - 150px)',
            'a': {
                maxHeight: '250px',
            },
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.inner': {
            'a': {
                maxHeight: '200px',
            },
            '> div': {
                height: '6vh',
            },
        },
    },
}));

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
    'a': {
        maxWidth: '70vw',
        height: '100%',
    },
    '.price': {
        fontSize: '1.15em',
        color: theme.palette.primary.main,
    },
}));

//
const SlideshowInfoLayout = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    padding: '30px 36px',
    position: 'relative',
    flex: '1',
}));

//
const ItemNewArrivalLayout = styled(Grid)(({ theme }) => ({
    '.items': {
        minWidth: '180px',
    },
    '.title': {
        WebkitLineClamp: theme.lineClamp(1),
    },
    [theme.breakpoints.down('mobile')]: {
        overflowX: 'auto',
        '.items': {
            maxWidth: '180px',
            'a': {
                width: '100%',
            },
        },
    },
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
        flex: '1',
    },
    '.item-content': {
        lineHeight: '1.8',
        padding: '30px 40px',
        flex: '2',
    },
    '.title': {
        fontSize: '1.3em',
        marginTop: '0',
        marginBottom: '24px',
    },
    'p': {
        fontSize: '1.15em',
    },
    [theme.breakpoints.down('mobile')]: {
        '.itemWrap': {
            marginBottom: '20px',
        },
        '.item-thumb': {
            height: '160px',
            flex: '1.5',
        },
        '.item-content': {
            padding: '20px',
        },
        '.title': {
            fontSize: '1.1em',
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.item-thumb': {
            height: '125px',
        },
        '.title': {
            fontSize: '1em',
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.itemWrap': {
            marginBottom: '16px',
        },
        '.item-content': {
            padding: '10px',
        },
        '.title': {
            fontSize: '0.9em',
        },
    },
}));

export {
    homeStyles,
    BannerWrapLayout,
    SlideShowWrapLayout,
    SlideShowItemLayout,
    SlideshowInfoLayout,
    ItemNewArrivalLayout,
    ItemTutorialLayout,
};
