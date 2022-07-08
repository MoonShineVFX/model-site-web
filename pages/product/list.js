import { Fragment, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Grid } from '@mui/material';

import Head from '../../src/containers/Head';
import Category from '../../src/components/product/Category';
import ListItem from '../../src/components/product/ListItem';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import useQuery from '../../src/utils/useQuery';

// dynamic
const Paginations = dynamic(() => import('../../src/components/Paginations'), { ssr: false });
const GridLayout = dynamic(() =>
    import('../../src/components/product/productLayout').then((mod) => mod.GridLayout)
);

const ProductList = ({ langs, pageData }) => {

    // Router
    const router = useRouter();
    const query = useQuery();

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // Click page
    const handleChangePage = (e, page) => {

        router.push({
            pathname: router.pathname,
            query: { ...router.query, page },
        });

    };

    return (

        <Fragment>
            <Head
                title={langs.menu_store}
                description={langs.og_description}
            />

            <GridLayout
                container
                columnSpacing={{ lg: '40px' }}
                component="section"
                className="page-product"
            >
                {
                    /**
                     * Notes:
                     * 1. 暫時隱藏 tag
                     * 2. 之後有顯示分類，右側 grid 可以加 loading
                     */
                    false &&
                        <Grid
                            item
                            xs={12}
                            mobile={3}
                            md={2}
                            component="aside"
                            className="tagsList"
                        >
                            <Category />
                        </Grid>
                }

                <Grid
                    item
                    xs={12}
                    // mobile={9}
                    // md={10}
                    component="figure"
                    className="productList"
                >
                    {
                        pageData.products.length ? (

                            <ListItem lists={pageData.products} />

                        ) : <h2 className="no-product">{langs.product_no_data}</h2>
                    }

                    {
                        (pageData.products.length > 10) &&
                            <Paginations
                                length={pageData.products.length}
                                currPage={+query.page}
                                onChange={handleChangePage}
                            />
                    }
                </Grid>
            </GridLayout>
        </Fragment>

    );

};

export default ProductList;

export async function getServerSideProps ({ query, locale }) {

    const resData = await util.serviceServer({
        method: 'get',
        url: `/products?page=${query.page}${query.tags ? `&tags=${query.tags}` : ''}&lang=${locale}`,
    });

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
