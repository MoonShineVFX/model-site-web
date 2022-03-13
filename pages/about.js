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
    fontSize: '1.25em',
    marginBottom: '40px',
    position: 'relative',
    '.thumb': {
        width: '100%',
        height: '100%',
        borderRadius: theme.borderRadius,
        opacity: '0.6',
        overflow: 'hidden',
    },
    '.title': {
        fontSize: '1.7em',
        marginTop: '0',
    },
    [theme.breakpoints.up('mobile')]: {
        height: '396px',
        padding: '0 110px',
        '&:before': {
            content: '""',
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        '.thumb': {
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '-1',
        },
        '.description': {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
    },
    [theme.breakpoints.down('mobile')]: {
        fontSize: '1em',
        marginBottom: '20px',
        '.thumb': {
            height: '253px',
        },
        '.title': {
            fontSize: '1.3em',
            marginTop: '0',
            marginBottom: '0',
            '& + p': {
                margin: '10px 0',
            },
        },
        '.description': {
            margin: '30px 0',
        },
    },
    [theme.breakpoints.down('middle')]: {
        '.thumb': {
            height: '180px',
        },
    },
}));

//
const SupportLayout = styled(Grid)(({ theme }) => ({
    fontSize: '1.15em',
    textAlign: 'center',
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    padding: '40px 0',
    '.count': {
        lineHeight: '1',
        fontSize: '2.3em',
        fontFamily: 'Robot',
        color: theme.palette.primary.main,
        margin: '0 0 16px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.8em',
        padding: '30px',
    },
    [theme.breakpoints.down('middle')]: {
        padding: '20px',
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
        model: supportModels,
        software: supportFormats,
        render: supportRenders,
    };

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
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

                <div className="description">
                    <h1 className="title">{title}</h1>
                    <p>{description}</p>
                </div>
            </BannerLayout>

            <SupportLayout
                container
                component="section"
                columnSpacing={2}
            >
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

    const resData = await util.serviceServer({ url: '/about_us' });
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
