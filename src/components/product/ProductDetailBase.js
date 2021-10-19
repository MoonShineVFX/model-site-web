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

import HeadTag from '../../containers/HeadTag';
import FontIcon from '../FontIcon';
import ItemsWrap from '../ItemsWrap';
import Item from '../Item';

import {
    ItemRelativeProductsLayout,
} from './productLayout';

import { GlobalContext } from '../../context/global.state';
import { ProductContext } from '../../context/product/product.state';
import useQuery from '../../utils/useQuery';
import deftag from '../../utils/util.deftag';

// deftag
const {
    product: {
        detail_section_title,
    },
} = deftag;

//
const ProductDetailBase = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Router
    const router = useRouter();
    const query = useQuery();

    // Context
    const { tag } = useContext(GlobalContext);
    const { productList } = useContext(ProductContext);

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <ItemsWrap title={detail_section_title} showMore={false}>
                <ItemRelativeProductsLayout>
                    {
                        pageData.data.relativeProducts.map(({ id, title, price, imgUrl }) => (

                            <Item
                                key={id}
                                title={title}
                                price={price}
                                imgUrl={imgUrl}
                            />

                        ))
                    }
                </ItemRelativeProductsLayout>
            </ItemsWrap>
        </Fragment>

    );

};

export default ProductDetailBase;
