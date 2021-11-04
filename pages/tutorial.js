import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';

import HeadTag from '../src/containers/HeadTag';
import Item from '../src/components/Item';

import util from '../src/utils/util';
import deftag from '../src/utils/util.deftag';

//
const TitleLayout = styled('h1')({
    fontSize: '2.15em',
    textAlign: 'center',
    marginBottom: '120px',
});

//
const ItemWrapLayout = styled(Grid)({
    '.item .item-thumb': {
        height: '161px',
    },
});

//
const Tutorial = ({ pageData }) => {

    const { tutorial } = pageData.data;

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <TitleLayout>{deftag.tutorial.title}</TitleLayout>

            <ItemWrapLayout
                container
                rowSpacing="20px"
                columnSpacing="36px"
                component="section"
            >
                {
                    tutorial.map(({ id, title, imgUrl, link }) => (

                        <Grid
                            key={id}
                            item
                            xs={12}
                            md={3}
                        >
                            <Item
                                type="product"
                                url={link}
                                width="273"
                                height="161"
                                data={{ title, imgUrl }}
                                newPage
                            />
                        </Grid>

                    ))
                }
            </ItemWrapLayout>
        </Fragment>

    );

};

export default Tutorial;

export async function getServerSideProps () {

    // const res = await util.serviceServer('/json/home/home.json');
    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/tutorial.json');
    const data = await res.json();

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: {
                title: '文件',
                data: data.data,
            },
        },
    };

};
