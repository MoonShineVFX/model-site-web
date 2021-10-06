import React, { Fragment, useContext, useEffect, useState, useCallback } from 'react';
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
    // console.log('router:', router.query)

    // Context
    const { tag } = useContext(GlobalContext);
    const {
        lists,
        productList,
    } = useContext(ProductContext);

    // State
    const [value, setValue] = useState('all');
    const [selectedTag, setSelectedTag] = useState(arrangeTags(router.query.tag));

    useEffect(() => {

        if (!router.query.type) return;
        setValue(router.query.type);
        // setSelectedTag(arrangeTags(router.query.tag));

    }, [router]);

    // 選擇標籤
    const handleSelectedTag = (id) => {

        // console.log('id:', id);
        setSelectedTag({
            ...selectedTag,
            [id]: !selectedTag[id],
        });

        // Betty: 待解
        router.push({
            pathname: '/product/list',
            query: {
                ...router.query,
                tag: Object.keys(selectedTag).filter((key) => selectedTag[key]).join(','),
            },
        });

    };

    // Change TabMenu
    const handleChangeTabMenu = (e, newValue) => setValue(newValue);

    // Click TabMenu
    const handleClickTabMenu = (key) => {

        router.push({
            pathname: '/product/list',
            query: {
                ...router.query,
                type: key,
            },
        });

        // console.log('router:', router.query)

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
            pathname: '/product/list',
            query: { ...router.query, page },
        });

    };

    // console.log('router', router.query)
    console.log('selectedTag', selectedTag)

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
                    {
                        // 預設 tab 為 all，當切換 tab 時，active 會跳動
                        router.query.type &&
                            <Fragment>
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
                                        Object.keys(pageData.data.category).map((key, idx) => (

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
                                    // length={100}
                                    length={pageData.data.product.length}
                                    currPage={+router.query.page}
                                    onChange={handleChangePage}
                                />
                            </Fragment>
                    }
                </Grid>
            </GridLayout>
        </Fragment>

    );

};

export default ProductListBase;
