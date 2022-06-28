import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import {
    Grid,
    List,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import {
    GridLayout,
    ListTitleLayout,
    ListItemLayout,
} from '../../src/components/product/productLayout';
import Head from '../../src/containers/Head';
import Loading from '../../src/components/Loading';
import Paginations from '../../src/components/Paginations';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import useQuery from '../../src/utils/useQuery';

// dynamic
const ListItem = dynamic(() => import('../../src/components/product/ListItem'), {
    loading: () => <Loading />,
    ssr: false,
});

// 整理 URL 標籤格式
const arrangeTags = (string) => {

    let data = string.split(',');
    return data.reduce((acc, curr) => {

        acc[curr] = true;
        return acc;

    }, {});

};

const ProductList = ({ langs, pageData }) => {

    // Router
    const router = useRouter();
    const query = useQuery();

    // Context
    const {
        tags: tagsOpt,
        globalDispatch,
    } = useContext(GlobalContext);

    // State
    const [selectedTag, setSelectedTag] = useState({});

    useEffect(() => {

        // 沒有 tag 也不要丟空值
        if (query.tags) setSelectedTag(arrangeTags(query.tags));

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // 選擇標籤
    const handleSelectedTag = (id) => {

        // 另外用物件暫存選取行為，若丟到 state 會有非同步問題
        let obj = {};
        obj = {
            ...selectedTag,
            [id]: !selectedTag[id],
        };

        let param = (Object.keys(obj).some((id) => obj[id])) ? { ...query, tags: Object.keys(obj).filter((key) => obj[key]).join(',') } : { page: query.page };

        setSelectedTag(obj);
        router.push({
            pathname: router.pathname,
            query: { ...param },
        });

    };

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
                    // Betty: 暫時隱藏 tag
                    false &&
                        <Grid
                            item
                            xs={12}
                            mobile={3}
                            md={2}
                            component="aside"
                            className="tagsList"
                        >
                            <ListTitleLayout>{langs.product_select_label}</ListTitleLayout>
                            <List>
                                {
                                    tagsOpt.map(({ id, name }) => (

                                        <ListItemLayout
                                            key={id}
                                            selected={selectedTag[id]}
                                            onClick={() => handleSelectedTag(id)}
                                            component="li"
                                        >
                                            <ListItemText>{name}</ListItemText>

                                            {
                                                selectedTag[id] &&
                                                    <ListItemIcon className="checked">
                                                        <FontIcon icon={faCheck} />
                                                    </ListItemIcon>
                                            }
                                        </ListItemLayout>

                                    ))
                                }
                            </List>
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
