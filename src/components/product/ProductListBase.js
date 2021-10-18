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
    const { tag } = useContext(GlobalContext);
    const { productList } = useContext(ProductContext);

    // State
    const [value, setValue] = useState('all');
    const [selectedTag, setSelectedTag] = useState({});

    useEffect(() => {

        if (!query.type) return;
        setValue(query.type);

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

        let param = (Object.keys(obj).some((id) => obj[id])) ? { ...query, tag: Object.keys(obj).filter((key) => obj[key]).join(',') } : { page: query.page, type: query.type };

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

        // Betty: 先切換 tab 再點商店，active 沒有被更新
        console.log('key', key)

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

    console.log('value:', value)

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

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
                    <ListTitleLayout>標籤篩選</ListTitleLayout>

                    <List>
                        {
                            tag.map(({ id, name }) => (

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
                        aria-label="商品分類"
                        className="tab-menu"
                        value={value}
                        onChange={handleChangeTabMenu}
                    >
                        {
                            Object.keys(pageData.data.category).map((key) => (

                                <Tab
                                    key={key}
                                    value={key}
                                    label={pageData.data.category[key]}
                                    onClick={() => handleClickTabMenu(key)}
                                />

                            ))
                        }
                    </Tabs>

                    <div className="tab-panel">
                        {
                            Object.keys(pageData.data.category).map((key) => (

                                <TabPanel
                                    key={key}
                                    value={value}
                                    indexKey={key}
                                >
                                    <ItemWrapLayout>
                                        {
                                            pageData.data.product.map(({
                                                id,
                                                title,
                                                price,
                                                imgUrl,
                                            }) => (

                                                <Item
                                                    key={id}
                                                    title={title}
                                                    price={price}
                                                    imgUrl={imgUrl}
                                                    url={`product/${id}`}
                                                    target="_blank"
                                                />

                                            ))
                                        }
                                    </ItemWrapLayout>
                                </TabPanel>

                            ))
                        }
                    </div>

                    <Paginations
                        length={pageData.data.product.length}
                        currPage={+query.page}
                        onChange={handleChangePage}
                    />
                </Grid>
            </GridLayout>
        </Fragment>

    );

};

export default ProductListBase;
