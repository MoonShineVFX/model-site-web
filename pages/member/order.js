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
        text_notice,
    },
} = deftag;

//
const TitleLayout = styled('h1')({
    textAlign: 'center',
    marginBottom: '100px',
});

//
const SectionLayout = styled('section')({
    maxWidth: '760px',
    margin: '0 auto',
    '.title-large': {
        fontSize: '1.25em',
        fontWeight: 'normal',
        marginBottom: '30px',
        opacity: '0.8',
    },
    '.btn-action': {
        textAlign: 'center',
        'p': {
            marginTop: '20px',
            opacity: '0.6',
        },
    },
    '.model-button': {
        width: '100%',
        maxWidth: '480px',
        fontSize: '1.25em',
        borderRadius: '40px',
        margin: '40px auto 0',
        padding: '22px 10px',
    },
});

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
    '.item-cell': {
        display: 'flex',
        '> *': {
            flex: '1',
        },
        '&.right': {
            alignItems: 'center',
        },
    },
    '.thumb': {
        maxWidth: '103px',
        height: '66px',
        borderRadius: '10px',
        marginRight: '20px',
        overflow: 'hidden',
    },
    '.info': {
        width: 'calc(100% - 103px)',
        fontSize: '0.9em',
        '> *:not(.title)': {
            opacity: '0.6',
        },
    },
    '.title': {
        fontSize: '1.2em',
        margin: '0',
        WebkitLineClamp: theme.lineClamp(1),
    },
    '.action': {
        textAlign: 'right',
        'span': {
            fontSize: '1.2em',
            color: '#ce5151',
            padding: '4px',
        },
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
        <Grid
            container
            alignItems="center"
            columnSpacing="20px"
        >
            <Grid
                item
                xs={8}
                className="item-cell"
            >
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
            </Grid>

            <Grid
                item
                xs={4}
                className="item-cell right"
            >
                <div className="price">{priceWithCommas(price)}</div>
                <div className="action">
                    <span onClick={onClick}>
                        <FontIcon icon={faTimes} />
                    </span>
                </div>
            </Grid>
        </Grid>
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
