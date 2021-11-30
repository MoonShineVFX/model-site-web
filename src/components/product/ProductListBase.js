import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    Grid,
    List,
    ListItemText,
    ListItemIcon,
    Tabs,
    Tab,
} from '@mui/material';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
    GridLayout,
    ListTitleLayout,
    ListItemLayout,
    ItemWrapLayout,
} from './productLayout';

import HeadTag from '../../containers/HeadTag';
import FontIcon from '../FontIcon';
import Item from '../Item';
import Paginations from '../Paginations';
import { GlobalContext } from '../../context/global.state';
import { ProductContext } from '../../context/product/product.state';
import useQuery from '../../utils/useQuery';
import deftag from '../../utils/util.deftag';

const {
    product: {
        page_title,
        select_label,
        product_category,
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

//
const TabPanel = ({ value, indexKey, children, ...other }) => (

    <div
        role="tabpanel"
        hidden={value !== indexKey}
        {...other}
    >
        {(value === indexKey) && children}
    </div>

);

const ProductListBase = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Router
    const router = useRouter();
    const query = useQuery();

    // Context
    const { tags } = useContext(GlobalContext);
    const { productList } = useContext(ProductContext);

    // State
    const [value, setValue] = useState('all');
    const [selectedTag, setSelectedTag] = useState({});

    useEffect(() => {

        if (!query.cate) return;
        setValue(query.cate);

        // 沒有 tag 也不要丟空值
        if (query.tag) setSelectedTag(arrangeTags(query.tag));

    }, []);

    // 選擇標籤
    const handleSelectedTag = (id) => {

        // 另外用物件暫存選取行為，若丟到 state 會有非同步問題
        let obj = {};
        obj = {
            ...selectedTag,
            [id]: !selectedTag[id],
        };

        let param = (Object.keys(obj).some((id) => obj[id])) ? { ...query, tag: Object.keys(obj).filter((key) => obj[key]).join(',') } : { page: query.page, cate: query.cate };

        setSelectedTag(obj);
        router.push({
            pathname: router.pathname,
            query: { ...param },
        });

    };

    // Change TabMenu
    const handleChangeTabMenu = (e, newValue) => setValue(newValue);

    // Click TabMenu
    const handleClickTabMenu = (key) => {

        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                cate: key,
            },
        });

        // Betty: 點即時本身就會觸發 get，似乎不用再另外送，需要真實串才知道
        // productList({
        //     ...router.query,
        //     page: +router.query.page,
        //     cate: key,
        // });

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
                spacing={7}
                component="section"
                className="page-product"
            >
                <Grid
                    item
                    xs={2}
                    component="aside"
                    className="tagsList"
                >
                    <ListTitleLayout>{select_label}</ListTitleLayout>

                    <List>
                        {
                            tags.map(({ id, name }) => (

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
                    xs
                    component="figure"
                    className="productList"
                >
                    <Tabs
                        aria-label={product_category}
                        className="tab-menu"
                        value={(query.cate !== value) ? query.cate : value} // 當 active 已換成別的，再點回 menu 的商店要還原成 "全部"
                        onChange={handleChangeTabMenu}
                    >
                        {
                            Object.keys(pageData.category).map((key) => (

                                <Tab
                                    key={key}
                                    value={key}
                                    label={pageData.category[key]}
                                    onClick={() => handleClickTabMenu(key)}
                                />

                            ))
                        }
                    </Tabs>

                    <div className="tab-panel">
                        {
                            Object.keys(pageData.category).map((key) => (

                                <TabPanel
                                    key={key}
                                    value={value}
                                    indexKey={key}
                                >
                                    <ItemWrapLayout>
                                        {
                                            pageData.product.map(({
                                                id,
                                                title,
                                                price,
                                                imgUrl,
                                            }) => (

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
                                </TabPanel>

                            ))
                        }
                    </div>

                    {
                        (pageData.product.length > 40) &&
                            <Paginations
                                length={pageData.product.length}
                                currPage={+query.page}
                                onChange={handleChangePage}
                            />

                    }
                </Grid>
            </GridLayout>
        </Fragment>

    );

};

export default ProductListBase;
