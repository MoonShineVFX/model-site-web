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
import useQuery from '../../utils/useQuery';
import deftag from '../../utils/util.deftag';

const {
    product: {
        page_title,
        select_label,
        product_category,
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
    const { tags: tagsOpt, globalDispatch } = useContext(GlobalContext);

    // State
    const [value, setValue] = useState('all');
    const [selectedTag, setSelectedTag] = useState({});

    useEffect(() => {

        if (!query.type) return;
        setValue(query.type);

        // 沒有 tag 也不要丟空值
        if (query.tags) setSelectedTag(arrangeTags(query.tags));

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

        let param = (Object.keys(obj).some((id) => obj[id])) ? { ...query, tags: Object.keys(obj).filter((key) => obj[key]).join(',') } : { page: query.page, cate: query.type };

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
                type: key,
            },
        });

        // Betty: 點即時本身就會觸發 get，似乎不用再另外送，需要真實串才知道
        // productList({
        //     ...router.query,
        //     page: +router.query.page,
        //     type: key,
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
                    xs
                    component="figure"
                    className="productList"
                >
                    <Tabs
                        aria-label={product_category}
                        className="tab-menu"
                        value={(query.type !== value) ? query.type : value} // 當 active 已換成別的，再點回 menu 的商店要還原成 "全部"
                        onChange={handleChangeTabMenu}
                    >
                        {
                            Object.keys(pageData.categories).map((key) => (

                                <Tab
                                    key={key}
                                    value={key}
                                    label={pageData.categories[key]}
                                    onClick={() => handleClickTabMenu(key)}
                                />

                            ))
                        }
                    </Tabs>

                    <div className="tab-panel">
                        {
                            Object.keys(pageData.categories).map((key) => (

                                <TabPanel
                                    key={key}
                                    value={value}
                                    indexKey={key}
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
                                </TabPanel>

                            ))
                        }
                    </div>

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

export default ProductListBase;
