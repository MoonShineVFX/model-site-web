import { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';

import HeadTag from '../../containers/HeadTag';
import ItemsWrap from '../ItemsWrap';
import Item from '../Item';
import Buttons from '../Buttons';
import ImageEnlarge from '../ImageEnlarge';

import {
    DetailWrapLayout,
    DetailContentLayout,
    FormatAndRenderLayout,
    DemoImageWrapLayout,
    DemoImageLayout,
} from './productLayout';

import { GlobalContext } from '../../context/global.state';
import { ProductContext } from '../../context/product/product.state';
import useQuery from '../../utils/useQuery';
import useLocalStorage from '../../utils/useLocalStorage';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';
import Service from '../../utils/util.service';

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
        detail_option_renderer,
        text_model_sum,
        text_file_size,
        text_per_image_size,
    },
} = deftag;

//
const ProductDetailBase = ({ pageData }) => {

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

    const { productList } = useContext(ProductContext);

    // State
    const [cartItem, setCartItem] = useLocalStorage('cartItem', {}); // 未登入狀態用 localStorage 存

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
                            <div className="label">軟體格式與算圖引擎</div>
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

export default ProductDetailBase;
