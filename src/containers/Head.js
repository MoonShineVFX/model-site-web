import React from 'react';
import PropTypes from 'prop-types';
import NextHead from 'next/head';

const Head = ({ title, description, children }) => (

    <NextHead>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />

        {/* og:Tag */}
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={description} key="description" />
        {/* <meta property="og:image" content="/logo_large.png" /> */}
        {children}
    </NextHead>

);

Head.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.any,
};

export default Head;
