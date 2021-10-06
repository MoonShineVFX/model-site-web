import React, { Fragment, useContext, useState } from 'react';
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
import FontIcon from '../../components/FontIcon';
import Item from '../../components/Item';
import Paginations from '../../components/Paginations';
import { GlobalContext } from '../../context/global.state';

//
const TabPanel = ({ value, index, children, ...other }) => (

    <div
        role="tabpanel"
        hidden={value !== index}
        {...other}
    >
        {(value === index) && children}
    </div>

);

const ProductBase = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Router
    const router = useRouter();
    // console.log('query:', router.query)

    // Context
    const { tag } = useContext(GlobalContext);

    // State
    const [value, setValue] = useState(0);

    //
    const handleSelectedTag = (id) => {

        console.log('id:', id);

    };

    // Change TabMenu
    const handleChangeTabMenu = (e, newValue) => setValue(newValue);

    // Click TabMenu
    const handleClickTabMenu = (key) => {

        // console.log('key:', key);
        router.push({
            pathname: '/product/list',
            query: {
                ...router.query,
                type: key,
            },
        })

    };

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
                            tag.map(({ id, name }, idx) => (

                                <ListItemLayout
                                    key={id}
                                    selected={idx === 0}
                                    onClick={() => handleSelectedTag(id)}
                                    component="li"
                                >
                                    <ListItemText>{name}</ListItemText>

                                    <ListItemIcon className="checked">
                                        <FontIcon icon={faCheck} />
                                    </ListItemIcon>
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
                            Object.keys(pageData.data.category).map((key, idx) => (

                                <Tab
                                    key={key}
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
                                    index={idx}
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
                    />
                </Grid>
            </GridLayout>
        </Fragment>

    );

};

export default ProductBase;
