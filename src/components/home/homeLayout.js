import { styled } from '@mui/system';
import SlideShow from '../SlideShow';

const SlideShowWrapLayout = styled(SlideShow)(({ theme }) => ({
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
}));

const SlideShowItemLayout = styled('div')(({ theme }) => ({
    '.inner': {
        lineHeight: '1.8',
        maxHeight: '420px',
        borderRadius: theme.borderRadius,
        display: 'flex',
        overflow: 'hidden',
        '> *': {
            flex: 1,
        },
    },
    '.price': {
        fontSize: '1.15em',
        color: theme.palette.priceColor,
    },
}));

const SlideshowInfoLayout = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    padding: '30px 36px',
    position: 'relative',
    '.status': {
        fontWeight: 'bold',
        color: theme.palette.textColor,
    },
    '.title': {
        fontWeight: 'normal',
        margin: '16px 0 20px',
    },
    '.description': {
        fontSize: '1.15em',
        marginBottom: '30px',
        display: '-webkit-box',
        WebkitLineClamp: 5,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
}));

const ItemNewArrivalLayout = styled('div', {
    name: 'items',
})(({ theme }) => ({
    '.itemWrap': {
        width: 'calc((100% - (30px * 3)) / 4)',
        height: '328px',
        float: 'left',
        borderRadius: '16px',
        marginRight: '30px',
        position: 'relative',
        overflow: 'hidden',
        '&:nth-of-type(4n)': {
            marginRight: 0,
        },
    },
    '.item-thumb': {
        height: '100%',
        'img': {
            margin: '0 auto',
        },
    },
    '.item-content': {
        width: '100%',
        lineHeight: '1.3',
        color: theme.palette.textColor,
        backgroundColor: '#000',
        padding: '20px 24px',
        position: 'absolute',
        bottom: 0,
        opacity: .85,
        '.title': {
            fontSize: '1.15em',
            fontWeight: 'normal',
            margin: '0 0 4px',
        },
    },
    '.price': {
        fontWeight: 'bold',
        color: theme.palette.priceColor,
    },
}));

const ItemDocumentLayout = styled('div')(({ theme }) => ({
    '.itemWrap': {
        maxHeight: '238px',
        color: theme.palette.textColor,
        backgroundColor: theme.palette.card.main,
        textDecoration: 'none',
        borderRadius: '16px',
        display: 'flex',
        marginBottom: '30px',
        overflow: 'hidden',
        '&:hover': {
            backgroundColor: theme.palette.card.light,
        },
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
    SlideShowWrapLayout,
    SlideShowItemLayout,
    SlideshowInfoLayout,
    ItemNewArrivalLayout,
    ItemDocumentLayout,
};
