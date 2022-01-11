import React, { Fragment, useContext, useEffect, useState } from 'react';
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

const ProductListBase = ({ pageData }) => {

    // console.log('pageData:', pageData);

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
                columnSpacing="40px"
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

export default ProductListBase;
