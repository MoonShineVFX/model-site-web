import { Fragment, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import Head from '../src/containers/Head';
import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';

// dynamic
const Item = dynamic(() => import('../src/components/Item'));

//
const TitleLayout = styled('h1')(({ theme }) => ({
    fontSize: '2.15em',
    fontWeight: 'normal',
    marginBottom: '120px',
    [theme.breakpoints.up('middle')]: {
        textAlign: 'center',
    },
    [theme.breakpoints.down('middle')]: {
        fontSize: '1.4em',
        marginBottom: '30px',
    },
}));

//
const ItemWrapLayout = styled(Grid)(({ theme }) => ({
    '.item.style-product': {
        width: '100%',
        '.item-thumb': {
            height: '161px',
        },
    },
    '.title': {
        display: '-webkit-box',
        WebkitLineClamp: theme.lineClamp(2),
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    [theme.breakpoints.down('middle')]: {
        '.container': {
            width: '100%',
        },
        '.item.style-product': {
            backgroundColor: theme.palette.card.main,
            borderRadius: '10px',
            display: 'flex',
            marginBottom: '0',
            '&.style-product .item-thumb': {
                maxWidth: '120px',
                height: '10vh',
                borderTopRightRadius: '0',
                borderBottomRightRadius: '0',
            },
            '.item-content': {
                width: 'calc(100% - 120px)',
                padding: '10px',
            },
        },
        '.title': {
            fontSize: '1em',
        },
    },
}));

//
const Tutorial = ({ langs, pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            <Head
                title={langs.tutorial_title}
                description={langs.og_description}
            />
            <TitleLayout>{langs.tutorial_title}</TitleLayout>

            <ItemWrapLayout
                container
                rowSpacing="20px"
                columnSpacing={{ middle: '36px' }}
                component="section"
            >
                {
                    pageData.list.map(({ id, title, imgUrl, link }) => (

                        <Grid
                            key={id}
                            item
                            xs={12}
                            middle={6}
                            sm={4}
                            md={3}
                            className="container"
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

export async function getServerSideProps ({ locale }) {

    const resData = await util.serviceServer({ url: `/tutorials?lang=${locale}` });
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

}
