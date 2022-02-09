import { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';

import HeadTag from '../../src/containers/HeadTag';
import ItemsWrap from '../../src/components/ItemsWrap';
import Item from '../../src/components/Item';
import Buttons from '../../src/components/Buttons';
import ImageEnlarge from '../../src/components/ImageEnlarge';

import {
    DetailWrapLayout,
    DetailContentLayout,
    FormatAndRenderLayout,
    DemoImageWrapLayout,
    DemoImageLayout,
} from '../../src/components/product/productLayout';

import { GlobalContext } from '../../src/context/global.state';
import useQuery from '../../src/utils/useQuery';
import useLocalStorage from '../../src/utils/useLocalStorage';
import util from '../../src/utils/util';
import deftag from '../../src/utils/util.deftag';
import Service from '../../src/utils/util.service';

const {
    priceWithCommas,
    mappingTags,
    arrangeFormatAndRender,
} = util;

// deftag
const {
    product: {
        detail_section_title1,
        detail_section_title2,
        button_add_to_card,
        notice_message,
        detail_format_and_render,
        detail_option_renderer,
        text_model_sum,
        text_file_size,
        text_per_image_size,
    },
} = deftag;

//
const ProductDetail = ({ pageData }) => {

    // Router
    const query = useQuery();

    // Context
    const {
        visible,
        currEvent,
        tags,
        formStorageData,
        formStorageDispatch,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // State
    const [cartItem, setCartItem] = useLocalStorage('cartItem'); // 未登入狀態用 localStorage 存

    useEffect(() => {

        document.body.style.overflow = (visible && currEvent === 'viewImg') ? 'hidden' : '';
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // 點圖放大
    const handleClickImgEnlarge = (url, id) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'viewImg' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: { id, imgUrl: url },
        });

    };

    // 加入購物車
    const handleAddToCart = () => {

        let item = {
            ...cartItem,
            [query.id]: {
                title: pageData.title,
                imgUrl: pageData.thumb,
                price: pageData.price,
            },
        };

        Service.cartAdd({ productId: pageData.id })
            .then(() => {

                setCartItem(item);
                globalDispatch({
                    type: 'add_cart',
                    payload: Object.entries(item).length,
                });

            });

    };

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <DetailWrapLayout>
                <div className="detail-banner">
                    <img
                        src={pageData.imgUrl}
                        alt={pageData.title}
                        title={pageData.title}
                        width="1200"
                        height="396"
                    />
                </div>

                <DetailContentLayout container>
                    <Grid item xs>
                        <div className="tags">
                            {pageData.tags.map((id) => (

                                <span
                                    key={id}
                                    className="tag"
                                >
                                    {mappingTags(tags)[id]}
                                </span>

                            ))}
                        </div>
                        <h1 className="title">{pageData.title}</h1>
                        <p className="description">{pageData.description}</p>
                        <div>
                            <div className="label">{detail_format_and_render}</div>
                            <FormatAndRenderLayout>
                                {
                                    Object.keys(arrangeFormatAndRender(pageData.models)).map((id) => (

                                        <li
                                            key={id}
                                            className="item"
                                        >
                                            <h4 className="title">{arrangeFormatAndRender(pageData.models)[id].name}</h4>
                                            <span className="renders">
                                                <span>{detail_option_renderer}: </span>
                                                {arrangeFormatAndRender(pageData.models)[id].renders.map(({ rendererName }) => rendererName).join('、')}
                                            </span>
                                        </li>

                                    ))
                                }
                            </FormatAndRenderLayout>
                        </div>
                        <p className="notice">{notice_message}</p>
                    </Grid>

                    <Grid
                        item
                        xs
                        sx={{
                            maxWidth: '260px',
                            marginLeft: '80px',
                        }}
                    >
                        <h2 className="price">{priceWithCommas(pageData.price)}</h2>
                        <Buttons
                            text={button_add_to_card}
                            onClick={handleAddToCart}
                        />
                        <div className="other-info">
                            <div>
                                <div className="label">{text_model_sum}</div>
                                <p>{pageData.modelSum}</p>
                            </div>
                            <div>
                                <div className="label">{text_file_size}</div>
                                <p>{pageData.fileSize}</p>
                            </div>
                            <div>
                                <div className="label">{text_per_image_size}</div>
                                <p>{pageData.perImgSize}</p>
                            </div>
                        </div>
                    </Grid>
                </DetailContentLayout>
            </DetailWrapLayout>

            <DemoImageWrapLayout
                title={detail_section_title1}
                showMore={false}
            >
                <Grid
                    container
                    rowSpacing="60px"
                    columnSpacing="80px"
                >
                    {
                        pageData.previews.map(({ id, url }) => (

                            <Grid
                                key={id}
                                item
                                xs={12}
                                md={6}
                            >
                                <DemoImageLayout
                                    className="Model-effect-brightness"
                                    onClick={() => handleClickImgEnlarge(url, id)}
                                >
                                    <img
                                        src={url}
                                        alt={id}
                                        title={id}
                                        width="560"
                                        height="317"
                                    />
                                </DemoImageLayout>
                            </Grid>

                        ))
                    }
                </Grid>
            </DemoImageWrapLayout>

            <ItemsWrap
                title={detail_section_title2}
                showMore={false}
            >
                <Grid container spacing="30px">
                    {
                        pageData.relativeProducts.map(({ id, title, price, imgUrl }, idx) => (

                            <Grid
                                key={idx}
                                item
                                xs={12}
                                md={3}
                            >
                                <Item
                                    url={`/product/${id}`}
                                    data={{ title, price, imgUrl }}
                                />
                            </Grid>

                        ))
                    }
                </Grid>
            </ItemsWrap>

            {
                (visible && currEvent === 'viewImg') &&
                    <ImageEnlarge
                        id={formStorageData.id}
                        imgUrl={formStorageData.imgUrl}
                    />
            }
        </Fragment>

    );

};

export default ProductDetail;

export async function getServerSideProps ({ params }) {

    const resData = await util.serviceServer({
        method: 'get',
        url: `/products/${params.id}`,
    });

    const { data } = resData;

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    // 下架商品導回列表頁
    if (!data.data.isActive) {

        return {
            redirect: {
                destination: '/product/list?page=1&type=all',
                permanent: false,
            },
        };

    }

    return {
        props: {
            pageData: data.data,
        },
    };

}
