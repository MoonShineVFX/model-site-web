import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import HeadTag from '../../src/containers/HeadTag';
import Buttons from '../../src/components/Buttons';
import FontIcon from '../../src/components/FontIcon';
import {
    TitleLayout,
    SectionLayout,
    CartLayout,
    ItemLayout,
} from '../../src/components/member/cartLayout';

import util from '../../src/utils/util';
import deftag from '../../src/utils/util.deftag';

const { priceWithCommas } = util;

const {
    cart: {
        text_order_title,
        btn_confirm_order,
        section_title,
        text_title_format,
        text_title_render,
        text_notice,
    },
} = deftag;

// 商品欄位
const TableGrid = ({ colLeft, colRight }) => (

    <Grid
        container
        alignContent="center"
        columnSpacing="20px"
    >
        <Grid
            item
            xs={7}
            className="item-cell"
        >
            {colLeft && colLeft}
        </Grid>
        <Grid
            item
            xs={5}
            className="item-cell right"
        >
            {colRight && colRight}
        </Grid>
    </Grid>
);

// 商品
const Item = ({
    onClick,
    data: {
        id,
        title,
        price,
        imgUrl,
        format,
        render,
    },
}) => (

    <ItemLayout
        url={`/product/${id}`}
        newPage
    >
        <TableGrid
            colLeft={(
                <Fragment>
                    <div className="thumb">
                        <img
                            src={imgUrl}
                            alt={title}
                            title={title}
                            width="103"
                            height="66"
                        />
                    </div>

                    <div className="info">
                        <h4 className="web-line-clamp title" title={title}>{title}</h4>
                        <div>{`${text_title_format}${format}`}</div>
                        <div>{`${text_title_render}${render}`}</div>
                    </div>
                </Fragment>
            )}
            colRight={(
                <Fragment>
                    <div className="price">{priceWithCommas(price)}</div>
                    <div className="action">
                        <span onClick={onClick}>
                            <FontIcon icon={faTimes} />
                        </span>
                    </div>
                </Fragment>
            )}
        />
    </ItemLayout>

);

//
const Order = ({ pageData }) => {

    // console.log('pageData:', pageData)

    //
    const handleRemoveItem = (e) => {

        e.preventDefault();
        console.log('remove');

    };

    // 送出訂單
    const handleClickOrder = () => {

        console.log('order!!!!');

    };

    return (

        <Fragment>
            <HeadTag title={text_order_title} />
            <TitleLayout>{text_order_title}</TitleLayout>

            <SectionLayout>
                <h3 className="title-large">{section_title}</h3>

                <CartLayout>
                    <div className="items">
                        {
                            pageData.list.map((data) => (

                                <Item
                                    key={data.id}
                                    data={data}
                                    onClick={handleRemoveItem}
                                />

                            ))
                        }
                    </div>

                    <div className="amount">
                        <TableGrid
                            colRight={(
                                <Fragment>
                                    <span>總額</span>
                                    <span className="price">{priceWithCommas(pageData.amount)}</span>
                                </Fragment>
                            )}
                        />
                    </div>
                </CartLayout>

                <div className="btn-action">
                    <Buttons
                        text={btn_confirm_order}
                        onClick={handleClickOrder}
                    />
                    <p>{text_notice}</p>
                </div>
            </SectionLayout>
        </Fragment>

    );

};

export default Order;

export async function getServerSideProps () {

    // const res = await util.serviceServer('/json/home/home.json');
    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/product/cart.json');
    const data = await res.json();

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

/**
 * window 找不到的解法
 * https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
 */
