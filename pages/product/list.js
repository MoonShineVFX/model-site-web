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
import useQuery from '../../src/utils/useQuery';
import util from '../../src/utils/util';
import deftag from '../../src/utils/util.deftag';

const {
    product: {
        page_title,
        select_label,
        text_filter_no_product,
    },
} = deftag;

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
    const { tags: tagsOpt, globalDispatch } = useContext(GlobalContext);

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
            <HeadTag title={page_title} />

            <GridLayout
                container
                columnSpacing={{ mobile: '40px' }}
                component="section"
                className="page-product"
            >
                <Grid
                    item
                    xs={12}
                    mobile={3}
                    md={2}
                    component="aside"
                    className="tagsList"
                >
                    <ListTitleLayout>{select_label}</ListTitleLayout>
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

                <Grid
                    item
                    xs={12}
                    mobile={9}
                    md={10}
                    component="figure"
                    className="productList"
                >
                    {
                        pageData.products.length ? (

                            <ItemWrapLayout>
                                {
                                    pageData.products.map(({ id, title, price, imgUrl }) => (

                                        <Item
                                            key={id}
                                            type="product"
                                            url={`/product/${id}`}
                                            width="321"
                                            height="186"
                                            data={{ title, price, imgUrl }}
                                            newPage
                                        />

                                    ))
                                }
                            </ItemWrapLayout>

                        ) : <h2 className="no-product">{text_filter_no_product}</h2>
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

export async function getServerSideProps ({ query }) {

    const resData = await util.serviceServer({
        method: 'get',
        url: `/products?page=${query.page}${query.tags ? `&tags=${query.tags}` : ''}`,
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
