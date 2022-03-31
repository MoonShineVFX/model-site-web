import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';

import { useRouter } from 'next/router';

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
    ItemWrapLayout,
} from '../../src/components/product/productLayout';

import HeadTag from '../../src/containers/HeadTag';
import FontIcon from '../../src/components/FontIcon';
import Item from '../../src/components/Item';
import Paginations from '../../src/components/Paginations';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import useQuery from '../../src/utils/useQuery';
import useDeftags from '../../src/utils/useDeftags';

// 整理 URL 標籤格式
const arrangeTags = (string) => {

    let data = string.split(',');
    return data.reduce((acc, curr) => {

        acc[curr] = true;
        return acc;

    }, {});

};

const ProductList = ({ pageData }) => {

    // Router
    const router = useRouter();
    const query = useQuery();

    // Context
    const {
        tags: tagsOpt,
        globalDispatch,
    } = useContext(GlobalContext);

    // Hook
    const [deftag] = useDeftags();

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
            <HeadTag title={deftag?.menu_store} />

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
                            <ListTitleLayout>{deftag?.product_select_label}</ListTitleLayout>
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

                            <ItemWrapLayout
                                container
                                rowSpacing="40px"
                                columnSpacing="16px"
                            >
                                {
                                    pageData.products.map(({ id, title, price, imgUrl }) => (

                                        <Grid
                                            key={id}
                                            item
                                            xs={6}
                                            sm={4}
                                            mobile={3}
                                        >
                                            <Item
                                                type="product"
                                                url={`/product/${id}`}
                                                width="321"
                                                height="186"
                                                data={{ title, price, imgUrl }}
                                                newPage
                                            />
                                        </Grid>

                                    ))
                                }
                            </ItemWrapLayout>

                        ) : <h2 className="no-product">{deftag?.product_no_data}</h2>
                    }

                    {
                        (pageData.products.length > 40) &&
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

};
