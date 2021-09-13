import React, { Fragment, useContext } from 'react';
import { styled } from '@mui/system';
import { GlobalStyles } from '@mui/material';

import { Links } from '../src/components/Links';
import Slideshow from '../src/components/Slideshow';
import ItemsWrap from '../src/components/ItemsWrap';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/model';

const { priceWithCommas } = util;

const styles = {
    section: {
        marginBottom: '40px',
    },
};

const SlideshowWrap = styled('div')(({ theme }) => ({
    '.inner': {
        maxHeight: '420px',
        display: 'flex',
        '> *': {
            flex: 1,
        },
    },
}));

const SlideshowInfo = styled('div')(({ theme }) => ({
    backgroundColor: '#2F3137',
    padding: '40px',
    position: 'relative',
    'h1': {
        fontSize: '2.1em',
        margin: '0 0 8px',
    },
    '.price': {
        fontSize: '1.4em',
        color: theme.palette.primary.main,
    },
    '.status': {
        fontSize: '1.4em',
        border: `1px solid ${theme.palette.border.light}`,
        borderRadius: theme.borderRadius,
        padding: '12px 80px',
        position: 'absolute',
        bottom: '60px',
    },
}));

const ItemsBase = styled('div', {
    name: 'items',
})(({ theme }) => ({
    '.itemWrap': {
        width: 'calc(100% / 4 - 30px)',
        height: '328px',
        float: 'left',
        borderRadius: '16px',
        margin: '0 calc(30px * 4 / 3) 0 0',
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
        color: theme.palette.border.light,
        backgroundColor: '#2F3137',
        padding: '16px 24px',
        position: 'absolute',
        bottom: 0,
        opacity: .8,
        '*': {
            fontSize: '1.2em',
        },
        'h4': {
            margin: '0 0 4px',
        },
    },
    '.price': {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
}));

const Home = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Context
    const { slideshowActive } = useContext(GlobalContext);

    return (

        <Fragment>
            <GlobalStyles styles={styles} />

            <Slideshow data={pageData.banner}>
                {
                    pageData.banner.map(({
                        id,
                        title,
                        price,
                        imgUrl,
                        status,
                    }, idx) => (

                        <SlideshowWrap
                            key={id}
                            className={(idx === slideshowActive) ? 'active' : 'hide'}
                        >
                            <div className="inner">
                                <Links
                                    url="login"
                                    target="_blank"
                                >
                                    <img src={imgUrl} alt={title} />
                                </Links>

                                <SlideshowInfo>
                                    <h1>{title}</h1>
                                    <div className="price">{util.priceWithCommas(price)}</div>
                                    <span className="Model-x-align status">{status}</span>
                                </SlideshowInfo>
                            </div>
                        </SlideshowWrap>

                    ))
                }
            </Slideshow>

            <ItemsWrap
                title="新品"
                url="login"
            >
                <ItemsBase className="Model-clear-box">
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
                                    <h4>{title}</h4>
                                    <span className="price">{priceWithCommas(price)}</span>
                                </div>
                            </Links>

                        ))
                    }
                </ItemsBase>
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
