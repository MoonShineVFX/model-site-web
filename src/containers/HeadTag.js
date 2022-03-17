import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import deftag from '../utils/util.deftag';

const { common: { og_title, og_description } } = deftag;

 const HeadSEO = ({ title, description, children }) => (

    <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />

        {/* og:Tag */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content="/logo_large.png" /> */}
        {children}
    </Head>

);

HeadSEO.defaultProps = {
    title: og_title,
    description: og_description,
};

HeadSEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.any,
};

export default HeadSEO;
