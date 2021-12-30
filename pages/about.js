import React, { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import HeadTag from '../src/containers/HeadTag';
import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import deftag from '../src/utils/util.deftag';

const { about } = deftag;

//
const BannerLayout = styled('section')(({ theme }) => ({
    height: '396px',
    fontSize: '1.25em',
    marginBottom: '40px',
    position: 'relative',
    '&:before': {
        content: '""',
        height: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    '.thumb': {
        width: '100%',
        height: '100%',
        borderRadius: theme.borderRadius,
        position: 'absolute',
        opacity: '.6',
        overflow: 'hidden',
        top: '0',
        left: '0',
        zIndex: '-1',
    },
    '.description': {
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '0 110px',
    },
    '.title': {
        fontSize: '1.7em',
        marginTop: '0',
    }
}));

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
const About = ({ pageData }) => {

    const {
        title,
        description,
        imgUrl,
        supportModels,
        supportFormats,
        supportRenders,
    } = pageData;

    const support = {
        supportModels,
        supportFormats,
        supportRenders,
    };

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            <HeadTag title={about.page_title} />

            <BannerLayout>
                <div className="thumb">
                    <img
                        src={imgUrl}
                        alt={title}
                        title={title}
                        width="1200"
                        height="396"
                    />
                </div>

                <span className="description">
                    <h1 className="title">{title}</h1>
                    <p>{description}</p>
                </span>
            </BannerLayout>

            <SupportLayout container component="section">
                {
                    Object.keys(support).map((key) => (

                        <Grid
                            key={key}
                            item
                            xs={4}
                        >
                            <p className="count">{support[key]}</p>
                            {about[`support_${key}`]}
                        </Grid>

                    ))
                }
            </SupportLayout>
        </Fragment>

    );

};

export default About;

export async function getServerSideProps () {

    // const resData = await util.serviceServer({ url: '/about_us' });
    // const { data } = resData;

    const resData = await fetch('http://localhost:1006/json/about.json');
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
