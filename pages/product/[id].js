import { Fragment, useContext, useEffect } from 'react';
import { Grid, useMediaQuery } from '@mui/material';

import {
    productDetailStyles,
    DetailWrapLayout,
    DetailContentLayout,
    FormatAndRendererLayout,
    DemoImageWrapLayout,
    DemoImageLayout,
    RelativeProductsLayout,
} from '../../src/components/product/productLayout';
import Head from '../../src/containers/Head';
import Item from '../../src/components/Item';
import Buttons from '../../src/components/Buttons';
import ImageEnlarge from '../../src/components/ImageEnlarge';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';
import Service from '../../src/utils/util.service';
import useQuery from '../../src/utils/useQuery';
import useLocalStorage from '../../src/utils/useLocalStorage';
import useGoogleAnalytics from '../../src/utils/useGoogleAnalytics';

const {
    priceWithCommas,
    mappingTags,
    arrangeFormatAndRender,
    formatBytes,
} = util;

// 價格
const renderPrice = (price, fxRate) => <h2 className="price">{priceWithCommas(price, 2, fxRate)}</h2>;

// 其他資訊
const renderOtherInfo = (pageData, langs) => (

    <div className="other-info">
        <div className="other-info-item">
            <div className="label">{langs.product_model_sum}</div>
            <p>{pageData.modelSum}</p>
        </div>
        <div className="other-info-item">
            <div className="label">{langs.product_file_size}</div>
            <p>{formatBytes(pageData.fileSize)}</p>
        </div>
        <div className="other-info-item">
            <div className="label">{langs.product_per_image_size}</div>
            <p>{pageData.perImgSize}</p>
        </div>
    </div>

);

//
const ProductDetail = ({ langs, pageData }) => {

    // Hook
    const matches = useMediaQuery((theme)=> theme.breakpoints.down('mobile'));
    const eventTracker = useGoogleAnalytics();

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
        fxRate,
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

        // Tracker
        eventTracker({
            category: pageData.title,
            action: `加入購物車 id_${query.id}`,
            label: '購物車',
        });

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
            <Head
                title={pageData.title}
                description={langs.og_description}
            />

            <DetailWrapLayout>
                <div className="detail-banner">
                    <img
                        src={matches ? pageData.mobileImgUrl : pageData.imgUrl}
                        alt={pageData.title}
                        width="1200"
                        height="396"
                    />
                </div>

                <DetailContentLayout
                    container
                    data-section="detail-data"
                >
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
                            matches && renderPrice(pageData.price, fxRate)
                        }

                        <p className="description">{pageData.description}</p>
                        <div className="format-and-renderer">
                            <div className="label">{langs.product_detail_format_and_renderer}</div>
                            <FormatAndRendererLayout>
                                {
                                    Object.keys(arrangeFormatAndRender(pageData.models)).map((id) => (

                                        <li
                                            key={id}
                                            className="item"
                                        >
                                            <h4 className="title">{arrangeFormatAndRender(pageData.models)[id].name}</h4>
                                            <span className="renders">
                                                <span>{langs.product_render}: </span>
                                                {arrangeFormatAndRender(pageData.models)[id].renders.map(({ rendererName }) => rendererName).join('、')}
                                            </span>
                                        </li>

                                    ))
                                }
                            </FormatAndRendererLayout>
                        </div>
                        <p className="notice">{langs.product_detail_notice_message}</p>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        mobile={4}
                        className="grid-right"
                    >
                        {
                            // mWeb
                            matches && renderOtherInfo(pageData, langs)
                        }

                        {
                            // Web
                            !matches && renderPrice(pageData.price, fxRate)
                        }

                        <Buttons
                            text={langs.btn_add_to_cart}
                            onClick={handleAddToCart}
                        />

                        {
                            // Web
                            !matches && renderOtherInfo(pageData, langs)
                        }
                    </Grid>
                </DetailContentLayout>
            </DetailWrapLayout>

            <DemoImageWrapLayout
                title={langs.product_detail_section_title01}
                showMore={false}
                data-section="demo-image"
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
                        pageData.previews.map(({ id, url }, idx) => (

                            <Grid
                                key={id}
                                item
                                xs={6}
                                mobile={6}
                            >
                                <DemoImageLayout
                                    className="Model-effect-brightness"
                                    onClick={() => handleClickImgEnlarge(url, id)}
                                    data-index={idx}
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

            {
                !!pageData.relativeProducts.length &&
                    <RelativeProductsLayout
                        title={langs.product_detail_section_title02}
                        showMore={false}
                    >
                        <div className="items">
                            {
                                pageData.relativeProducts.map(({ id, title, price, imgUrl }, idx) => (

                                    <div
                                        key={idx}
                                        className="itemWrap"
                                    >
                                        <Item
                                            url={`/product/${id}`}
                                            data={{ title, price, imgUrl }}
                                        />
                                    </div>

                                ))
                            }
                        </div>
                    </RelativeProductsLayout>
            }

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
                destination: '/product/list?page=1',
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
