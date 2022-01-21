import React, { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import {
    homeStyles,
    SlideShowWrapLayout,
    SlideShowItemLayout,
    SlideshowInfoLayout,
    ItemTutorialLayout,
} from '../src/components/home/homeLayout';

import HeadTag from '../src/containers/HeadTag';
import Links from '../src/components/Links';
import ItemsWrap from '../src/components/ItemsWrap';
import Item from '../src/components/Item';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import deftag from '../src/utils/util.deftag';

const {
    home: {
        page_title,
        section_title_new_arrival,
        section_title_tutorial,
    },
} = deftag;

const Home = ({ pageData }) => {

    // Context
    const { slideshowActive, globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            {homeStyles}
            <HeadTag title={page_title} />

            <SlideShowWrapLayout data={pageData.banners}>
                {
                    pageData.banners.map(({
                        id,
                        title,
                        description,
                        imgUrl,
                        link,
                    }, idx) => (

                        <SlideShowItemLayout
                            key={id}
                            className={(idx === slideshowActive) ? 'active' : 'hide'}
                        >
                            <div className="inner">
                                <Links
                                    url={link}
                                    className="item"
                                    title={title}
                                    newPage
                                >
                                    <img
                                        src={imgUrl}
                                        alt={title}
                                        title={title}
                                        width="840"
                                        height="386"
                                    />
                                </Links>

                                <SlideshowInfoLayout>
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                </SlideshowInfoLayout>
                            </div>
                        </SlideShowItemLayout>

                    ))
                }
            </SlideShowWrapLayout>

            <ItemsWrap title={section_title_new_arrival} url="/product/list?page=1&type=all">
                <Grid container spacing="30px">
                    {
                        pageData.newArrivals.map(({ id, title, price, imgUrl }) => (

                            <Grid
                                key={id}
                                item
                                xs={12}
                                md={3}
                            >
                                <Item
                                    width="277"
                                    height="336"
                                    url={`/product/${id}`}
                                    data={{ title, price, imgUrl }}
                                    newPage
                                />
                            </Grid>

                        ))
                    }
                </Grid>
            </ItemsWrap>

            <ItemsWrap title={section_title_tutorial} url="signin">
                <ItemTutorialLayout>
                    {
                        pageData.tutorials.map(({ id, title, description, imgUrl }) => (

                            <Links
                                key={id}
                                url="/signin"
                                title={title}
                                className="itemWrap"
                                newPage
                            >
                                <div className="item-thumb">
                                    <img
                                        src={imgUrl}
                                        alt={title}
                                        title={title}
                                        width="380"
                                        height="206"
                                    />
                                </div>
                                <div className="item-content">
                                    <h3 className="title">{title}</h3>
                                    <p>{description}</p>
                                </div>
                            </Links>

                        ))
                    }
                </ItemTutorialLayout>
            </ItemsWrap>
        </Fragment>

    );

};

export default Home;

export async function getServerSideProps () {

    const resData = await util.serviceServer({ url: '/index' });
    const { data } = resData;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: data.data,
        },
    };

};
