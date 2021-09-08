import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

 const HeadSEO = ({ title, children }) => (

    <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {children}
    </Head>

);

HeadSEO.defaultProps = {
    title: '夢想下午茶',
};

HeadSEO.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};

export default HeadSEO;
