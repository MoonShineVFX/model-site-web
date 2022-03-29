import { Fragment, useContext, useEffect } from 'react';
import { Grid, useMediaQuery } from '@mui/material';

import {
    productDetailStyles,
    DetailWrapLayout,
    DetailContentLayout,
    FormatAndRenderLayout,
    DemoImageWrapLayout,
    DemoImageLayout,
    RelativeProductsLayout,
} from '../../src/components/product/productLayout';
import HeadTag from '../../src/containers/HeadTag';
import Item from '../../src/components/Item';
import Buttons from '../../src/components/Buttons';
import ImageEnlarge from '../../src/components/ImageEnlarge';

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
        product_detail_section_title01,
        product_detail_section_title02,
        btn_add_to_cart,
        product_detail_notice_message,
        product_detail_format_and_render,
        product_render,
        product_model_sum,
        product_file_size,
        product_per_image_size,
    },
} = deftag;

// 價格
const renderPrice = (price) => <h2 className="price">{priceWithCommas(price)}</h2>;

// 其他資訊
const renderOtherInfo = (pageData) => (

    <div className="other-info">
        <div className="other-info-item">
            <div className="label">{product_model_sum}</div>
            <p>{pageData.modelSum}</p>
        </div>
        <div className="other-info-item">
            <div className="label">{product_file_size}</div>
            <p>{pageData.fileSize}</p>
        </div>
        <div className="other-info-item">
            <div className="label">{product_per_image_size}</div>
            <p>{pageData.perImgSize}</p>
        </div>
    </div>

);

//
const ProductDetail = ({ pageData }) => {

    const matches = useMediaQuery((theme)=> theme.breakpoints.down('mobile'));

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
        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, [visible, currEvent, globalDispatch]);

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

                setCartItem(item); // 更新 localStorage
                globalDispatch({
                    type: 'add_cart',
                    payload: item,
                });

            });

    };

    return (

        <Fragment>
            {productDetailStyles}
            <HeadTag title={pageData.title} />

            <DetailWrapLayout>
                <div className="detail-banner">
                    <img
                        src={matches ? pageData.mobileImgUrl : pageData.imgUrl}
                        alt={pageData.title}
                        width="1200"
                        height="396"
                    />
                </div>

                <DetailContentLayout container>
                    <Grid
                        item
                        xs={12}
                        mobile={8}
                    >
                        {
                            // Betty: 暫時隱藏 tag
                            false &&
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
                        }

                        <h1 className="title">{pageData.title}</h1>

                        {
                            // mWeb
                            matches && renderPrice(pageData.price)
                        }

                        <p className="description">{pageData.description}</p>
                        <div>
                            <div className="label">{product_detail_format_and_render}</div>
                            <FormatAndRenderLayout>
                                {
                                    Object.keys(arrangeFormatAndRender(pageData.models)).map((id) => (

                                        <li
                                            key={id}
                                            className="item"
                                        >
                                            <h4 className="title">{arrangeFormatAndRender(pageData.models)[id].name}</h4>
                                            <span className="renders">
                                                <span>{product_render}: </span>
                                                {arrangeFormatAndRender(pageData.models)[id].renders.map(({ rendererName }) => rendererName).join('、')}
                                            </span>
                                        </li>

                                    ))
                                }
                            </FormatAndRenderLayout>
                        </div>
                        <p className="notice">{product_detail_notice_message}</p>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        mobile={4}
                        className="grid-right"
                    >
                        {
                            // mWeb
                            matches && renderOtherInfo(pageData)
                        }

                        {
                            // Web
                            !matches && renderPrice(pageData.price)
                        }

                        <Buttons
                            text={btn_add_to_cart}
                            onClick={handleAddToCart}
                        />

                        {
                            // Web
                            !matches && renderOtherInfo(pageData)
                        }
                    </Grid>
                </DetailContentLayout>
            </DetailWrapLayout>

            <DemoImageWrapLayout
                title={product_detail_section_title01}
                showMore={false}
            >
                <Grid
                    container
                    rowSpacing={{
                        xs: '20px',
                        mobile: '40px',
                        md: '60px',
                    }}
                    columnSpacing={{
                        xs: '20px',
                        mobile: '40px',
                        md: '80px',
                    }}
                >
                    {
                        pageData.previews.map(({ id, url }) => (

                            <Grid
                                key={id}
                                item
                                xs={6}
                                mobile={6}
                            >
                                <DemoImageLayout
                                    className="Model-effect-brightness"
                                    onClick={() => handleClickImgEnlarge(url, id)}
                                >
                                    <img
                                        src={url}
                                        alt={id}
                                        width="560"
                                        height="317"
                                    />
                                </DemoImageLayout>
                            </Grid>

                        ))
                    }
                </Grid>
            </DemoImageWrapLayout>

            <RelativeProductsLayout
                title={product_detail_section_title02}
                showMore={false}
            >
                <Grid
                    container
                    wrap="nowrap"
                    className="items"
                    spacing={{ xs: '12px', mobile: '30px' }}
                >
                    {
                        pageData.relativeProducts.map(({ id, title, price, imgUrl }, idx) => (

                            <Grid
                                key={idx}
                                item
                                xs={12}
                                md={3}
                                className="itemWrap"
                            >
                                <Item
                                    url={`/product/${id}`}
                                    data={{ title, price, imgUrl }}
                                />
                            </Grid>

                        ))
                    }
                </Grid>
            </RelativeProductsLayout>

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

export async function getServerSideProps ({ params, locale }) {

    const resData = await util.serviceServer({
        method: 'get',
        url: `/products/${params.id}?lang=${locale}`,
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
