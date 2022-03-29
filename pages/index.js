import React, { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import {
    homeStyles,
    ItemNewArrivalLayout,
    ItemTutorialLayout,
} from '../src/components/home/homeLayout';

import HeadTag from '../src/containers/HeadTag';
import Links from '../src/components/Links';
import ItemsWrap from '../src/components/ItemsWrap';
import Item from '../src/components/Item';
import Banner from '../src/components/home/Banner';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import deftag from '../src/utils/util.deftag';

const {
    home: {
        home_title,
        home_section_title01,
        home_section_title02,
    },
} = deftag;

const Home = ({ pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            {homeStyles}
            <HeadTag title={home_title} />

            {
                !!pageData.banners.length &&
                    <Banner pageData={pageData} />
            }

            <ItemsWrap title={home_section_title01} url="/product/list?page=1&type=all">
                <ItemNewArrivalLayout
                    container
                    wrap="nowrap"
                    columnSpacing={{
                        xs: '12px',
                        mobile: '30px',
                    }}
                >
                    {
                        pageData.products.map(({ id, title, price, imgUrl }) => (

                            <Grid
                                key={id}
                                item
                                xs={12}
                                mobile={3}
                                className="items"
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
                </ItemNewArrivalLayout>
            </ItemsWrap>

            <ItemsWrap title={home_section_title02} url="/tutorial">
                <ItemTutorialLayout>
                    {
                        pageData.tutorials.map(({ id, title, description, imgUrl, link }) => (

                            <Links
                                key={id}
                                url={link}
                                title={title}
                                className="itemWrap"
                                newPage
                                extra
                            >
                                <div className="item-thumb">
                                    <img
                                        src={imgUrl}
                                        alt={title}
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

export async function getServerSideProps ({ locale }) {

    const resData = await util.serviceServer({ url: `/index?lang=${locale}` });
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
