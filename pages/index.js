import React, { Fragment, useContext } from 'react';
import { GlobalStyles } from '@mui/material';
import {
    SlideShowWrapLayout,
    SlideShowItemLayout,
    SlideshowInfoLayout,
    ItemNewArrivalLayout,
    ItemDocumentLayout,
} from '../src/components/home/homeLayout';

import HeadTag from '../src/containers/HeadTag';
import { Links } from '../src/components/Links';
import ItemsWrap from '../src/components/ItemsWrap';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/model';

const { priceWithCommas } = util;

const styles = {
    'main > div > *': {
        marginBottom: '80px',
    },
};

const Home = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Style
    const homeStyles = <GlobalStyles styles={styles} />;

    // Context
    const { slideshowActive } = useContext(GlobalContext);

    return (

        <Fragment>
            {homeStyles}
            <HeadTag title={pageData.title} />

            <SlideShowWrapLayout data={pageData.data.banner}>
                {
                    pageData.data.banner.map(({
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
            </SlideShowWrapLayout>

            <ItemsWrap title="新品" url="login">
                <ItemNewArrivalLayout className="Model-clear-box">
                    {
                        pageData.data.newArrival.map(({ id, title, price, imgUrl }) => (

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
                                    <h4 className="title">{title}</h4>
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
                        pageData.data.document.map(({ id, title, description, imgUrl }) => (

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
                                    <h3 className="title">{title}</h3>
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

    const res = await fetch('http://localhost:1006/json/home.json');
    const data = await res.json();

    if (!data.result) {

        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        };

    }

    return {
        props: {
            pageData: {
                title: '首頁',
                data: data.data,
            },
        },
    };

};

export default Home;
