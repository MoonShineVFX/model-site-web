import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import HeadTag from '../../src/containers/HeadTag';
import Buttons from '../../src/components/Buttons';
import Links from '../../src/components/Links';
import FontIcon from '../../src/components/FontIcon';

import util from '../../src/utils/util';
import deftag from '../../src/utils/util.deftag';

const { priceWithCommas } = util;

const {
    order: {
        text_order_title,
        btn_confirm_order,
        section_title,
        text_title_format,
        text_title_render,
    },
} = deftag;

//
const TitleLayout = styled('h1')({
    textAlign: 'center',
    marginBottom: '100px',
});

//
const SectionLayout = styled('section')(({ theme }) => ({
    maxWidth: '760px',
    margin: '0 auto',
    '.title': {
        fontSize: '1.25em',
        fontWeight: 'normal',
        marginBottom: '30px',
        opacity: 0.8,
    },
}));

// 購物車
const CartListLayout = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.card.main,
    borderRadius: theme.borderRadius,
    padding: '40px 30px',
}));

// 商品
const ItemLayout = styled(Links)(({ theme }) => ({
    color: theme.palette.textColor,
    textDecoration: 'none',
    display: 'flex',
    marginBottom: '30px',
    '.item-action span': {
        color: '#ce5151',
        padding: '4px',
    },
}));

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
        <div className="item-thumb">
            <img
                src={imgUrl}
                alt={title}
                title={title}
                width="103"
                height="66"
            />
        </div>

        <div className="item-info">
            <h3 className="title">{title}</h3>
            <div>{`${text_title_format}${format}`}</div>
            <div>{`${text_title_render}${render}`}</div>
        </div>

        <div className="item-price">{priceWithCommas(price)}</div>

        <div className="item-action">
            <span onClick={onClick}>
                <FontIcon icon={faTimes} />
            </span>
        </div>
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
                <h3 className="title">{section_title}</h3>

                <CartListLayout>
                    {
                        pageData.list.map((data) => (

                            <Item
                                key={data.id}
                                data={data}
                                onClick={handleRemoveItem}
                            />

                        ))
                    }
                </CartListLayout>

                <Buttons
                    text={btn_confirm_order}
                    onClick={handleClickOrder}
                />
            </SectionLayout>
        </Fragment>

    );

};

export default Order;

export async function getServerSideProps () {

    // const res = await util.serviceServer('/json/home/home.json');
    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/product/order.json');
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
