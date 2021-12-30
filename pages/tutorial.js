import React, { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';

import HeadTag from '../src/containers/HeadTag';
import Item from '../src/components/Item';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import deftag from '../src/utils/util.deftag';

const { tutorial: { page_title } } = deftag;

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

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            <HeadTag title={page_title} />
            <TitleLayout>{page_title}</TitleLayout>

            <ItemWrapLayout
                container
                rowSpacing="20px"
                columnSpacing="36px"
                component="section"
            >
                {
                    pageData.list.map(({ id, title, imgUrl, link }) => (

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

    // const resData = await util.serviceServer({ url: '/tutorials' });
    // const { data } = resData;

    const resData = await fetch('http://localhost:1006/json/tutorial.json');
    const data = await resData.json();

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
