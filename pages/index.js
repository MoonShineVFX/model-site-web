import React, { Fragment, useContext } from 'react';
import { styled } from '@mui/system';
import { GlobalStyles } from '@mui/material';

import { Links } from '../src/components/Links';
import SlideShow from '../src/components/SlideShow';
import ItemsWrap from '../src/components/ItemsWrap';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/model';

const { priceWithCommas } = util;

const styles = {
    'main > div > *': {
        marginBottom: '80px',
    },
    'span.slideshow-control-arrows': {
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
};

const SlideShowItemLayout = styled('div')(({ theme }) => ({
    '.inner': {
        maxHeight: '420px',
        borderRadius: theme.borderRadius,
        display: 'flex',
        overflow: 'hidden',
        '> *': {
            flex: 1,
        },
    },
    '.price': {
        color: theme.palette.priceColor,
    },
}));

const SlideshowInfoLayout = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    padding: '40px',
    position: 'relative',
    '.status': {
        fontSize: '0.9em',
        fontWeight: 'bold',
        color: theme.palette.textColor,
    },
    '.title': {
        margin: '16px 0 20px',
    },
    '.description': {
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
        '*': {
            fontSize: '1.2em',
        },
        '.title': {
            fontSize: '1em',
            fontWeight: 'normal',
            margin: '0 0 4px',
        },
    },
    '.price': {
        fontSize: '0.9em',
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
        padding: '20px 40px',
        flex: 1,
    },
    'h2': {
        marginTop: 0,
    },
    'p': {
        fontSize: '1.3em',
    },
}));

const Home = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Context
    const { slideshowActive } = useContext(GlobalContext);

    return (

        <Fragment>
            <GlobalStyles styles={styles} />

            <SlideShow data={pageData.banner}>
                {
                    pageData.banner.map(({
                        id,
                        title,
                        description,
                        price,
                        imgUrl,
                        status,
                    }, idx) => (

                        <SlideShowItemLayout
                            key={id}
                            className={(idx === slideshowActive) ? 'active' : 'hide'}
                        >
                            <div className="inner">
                                <Links url="login" target="_blank">
                                    <img src={imgUrl} alt={title} />
                                </Links>

                                <SlideshowInfoLayout>
                                    <span className="status">{status}</span>
                                    <h2 className="title">{title}</h2>
                                    <p className="description" title={description}>{description}</p>
                                    <div className="price">{util.priceWithCommas(price)}</div>
                                </SlideshowInfoLayout>
                            </div>
                        </SlideShowItemLayout>

                    ))
                }
            </SlideShow>

            <ItemsWrap title="新品" url="login">
                <ItemNewArrivalLayout className="Model-clear-box">
                    {
                        pageData.newArrival.map(({ id, title, price, imgUrl }) => (

                            <Links
                                key={id}
                                url="login"
                                target="_blank"
                                className="itemWrap"
                            >
                                <div className="item-thumb">
                                    <img
                                        src={imgUrl}
                                        alt={title}
                                    />
                                </div>
                                <div className="item-content">
                                    <h5 className="title">{title}</h5>
                                    <span className="price">{priceWithCommas(price)}</span>
                                </div>
                            </Links>

                        ))
                    }
                </ItemNewArrivalLayout>
            </ItemsWrap>

            <ItemsWrap title="教學文件" url="login">
                <ItemDocumentLayout>
                    {
                        pageData.document.map(({ id, title, description, imgUrl }) => (

                            <Links
                                key={id}
                                url="login"
                                target="_blank"
                                className="itemWrap"
                            >
                                <div className="item-thumb">
                                    <img
                                        src={imgUrl}
                                        alt={title}
                                    />
                                </div>
                                <div className="item-content">
                                    <h2>{title}</h2>
                                    <p>{description}</p>
                                </div>
                            </Links>

                        ))
                    }
                </ItemDocumentLayout>
            </ItemsWrap>
        </Fragment>

    );

};

export async function getStaticProps () {

    // const res = await util.serviceServer('/json/home/home.json');
    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/home/home.json');
    const data = await res.json();

    if (!data.result) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    }

    return {
        props: { pageData: data.data },
    };

};

export default Home;
