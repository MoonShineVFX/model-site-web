import { Fragment, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Grid } from '@mui/material';

import { homeStyles, ItemLatestLayout } from '../src/components/home/homeLayout';
import Head from '../src/containers/Head';
import Loading from '../src/components/Loading';
import ItemsWrap from '../src/components/ItemsWrap';
import Item from '../src/components/Item';
import Banner from '../src/components/home/Banner';

import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import useGoogleAnalytics from '../src/utils/useGoogleAnalytics';

// dynamic
const Tutorial = dynamic(
    () => import('../src/components/home/Tutorial'),
    {
        loading: () => <Loading />,
        ssr: false,
    },
);

const Home = ({ langs, pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // Hook
    const eventTracker = useGoogleAnalytics();

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, [globalDispatch]);

    return (

        <Fragment>
            {homeStyles}
            <Head
                title={langs.home_title}
                description={langs.og_description}
            />

            {
                !!pageData.banners.length &&
                    <Banner lists={pageData.banners} />
            }

            <ItemsWrap
                title={langs.home_section_title01}
                url="/product/list?page=1"
                data-section="product"
            >
                <ItemLatestLayout
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
                                    onClick={() => eventTracker({
                                        category: title,
                                        action: `點擊商品 id_${id}`,
                                        label: '最新上架',
                                    })}
                                />
                            </Grid>

                        ))
                    }
                </ItemLatestLayout>
            </ItemsWrap>

            <ItemsWrap
                title={langs.home_section_title02}
                url="/tutorial"
                data-section="tutorial"
            >
                <Tutorial lists={pageData.tutorials} />
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

}
