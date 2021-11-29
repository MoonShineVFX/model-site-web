import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import HeadTag from '../../src/containers/HeadTag';
import util from '../../src/utils/util';
import deftag from '../../src/utils/util.deftag';

const {
    member: { text_order_title },
} = deftag;

//
const SupportLayout = styled(Grid)(({ theme }) => ({
    fontSize: '1.15em',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.borderRadius,
    padding: '40px 0',
    '.count': {
        lineHeight: '1',
        fontSize: '2.3em',
        fontFamily: 'Robot',
        margin: '0 0 16px',
    },
}));

//
const Order = ({ pageData }) => {

    const { title } = pageData.data;

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            123
        </Fragment>

    );

};

export default Order;

export async function getServerSideProps () {

    // const res = await util.serviceServer('/json/home/home.json');
    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/product/order.json');
    const data = await res.json();

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: {
                title: text_order_title,
                data: data.data,
            },
        },
    };

};
