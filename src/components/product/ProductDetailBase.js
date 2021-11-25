import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';

import { Grid } from '@mui/material';

import HeadTag from '../../containers/HeadTag';
import ItemsWrap from '../ItemsWrap';
import Item from '../Item';
import Buttons from '../Buttons';
import ImageEnlarge from '../ImageEnlarge';

import {
    DetailWrapLayout,
    DetailContentLayout,
    SelectOptLayout,
    DemoImageWrapLayout,
    DemoImageLayout,
} from './productLayout';

import { GlobalContext } from '../../context/global.state';
import { ProductContext } from '../../context/product/product.state';
import util from '../../utils/util';
import useQuery from '../../utils/useQuery';
import deftag from '../../utils/util.deftag';
import useLocalStorage from '../../utils/useLocalStorage';

const { priceWithCommas, mappingTags } = util;

// deftag
const {
    product: {
        detail_section_title1,
        detail_section_title2,
        button_add_to_card,
        notice_message,
        detail_option_format,
        detail_option_renderer,
    },
} = deftag;

//
const arrangeRenderOpts = (data) => data.reduce((acc, curr) => {

    const key = curr.id;
    acc[key] = acc[key] || {};
    acc[key].label = curr.label;
    acc[key].renderers = curr.renderers;
    return acc;

}, {});

//
const ProductDetailBase = ({ pageData }) => {

    // console.log('pageData:', pageData);

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
    const [selectedFormat, setSelectedFormat] = useState(null);
    const [selectedRender, setSelectedRender] = useState(null);
    const [cartItem, setCartItem] = useLocalStorage('cartItem', {}); // 未登入狀態用 localStorage 存

    useEffect(() => {

        document.body.style.overflow = (visible && currEvent === 'viewImg') ? 'hidden' : '';

    });

    // 軟體格式 + 算圖引擎
    const handleSelected = ({ target: { name, value } }) => {

        if (name === 'formats') setSelectedFormat(value);
        else setSelectedRender(value);

    };

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
                title: pageData.data.title,
                imgUrl: pageData.data.imgUrl,
                price: pageData.data.price,
            },
        };

        setCartItem(item);

        globalDispatch({
            type: 'add_cart',
            payload: Object.entries(item).length,
        });

    };

    return (

        <Fragment>
            <HeadTag title={pageData.title} />

            <DetailWrapLayout>
                <div className="detail-banner">
                    <img
                        src={pageData.data.imgUrl}
                        alt={pageData.data.title}
                        title={pageData.data.title}
                        width="1200"
                        height="396"
                    />
                </div>

                <DetailContentLayout container>
                    <Grid item xs>
                        <div className="tags">
                            {pageData.data.tags.map((id) => (

                                <span
                                    key={id}
                                    className="tag"
                                >
                                    {mappingTags(tags)[id]}
                                </span>

                            ))}
                        </div>
                        <h1 className="title">{pageData.data.title}</h1>
                        <p className="description">{pageData.data.description}</p>
                        <div>
                            <div className="label">模型數量</div>
                            <p>{pageData.data.modelSum}</p>
                        </div>
                        <div>
                            <div className="label">檔案大小</div>
                            <p>{pageData.data.fileSize}</p>
                        </div>
                        <div>
                            <div className="label">貼圖尺寸</div>
                            <p>{pageData.data.perImgSize}</p>
                        </div>
                    </Grid>

                    <Grid
                        item
                        xs
                        sx={{
                            maxWidth: '260px',
                            marginLeft: '80px',
                        }}
                    >
                        <div className="select-opts">
                            <SelectOptLayout name="formats" onChange={handleSelected}>
                                <option value="">{detail_option_format}</option>
                                {
                                    (pageData.data.formats).map(({ id, label }) => (

                                        <option
                                            key={id}
                                            value={id}
                                        >
                                            {label}
                                        </option>

                                    ))
                                }
                            </SelectOptLayout>

                            <SelectOptLayout name="renders" onChange={handleSelected}>
                                <option value="">{detail_option_renderer}</option>
                                {
                                    // 有選取第一層才印第二層
                                    selectedFormat && arrangeRenderOpts(pageData.data.formats)[selectedFormat].renderers.map(({ id, label }) => (

                                        <option key={id} value={id}>{label}</option>

                                    ))
                                }
                            </SelectOptLayout>
                        </div>
                        <p className="notice">{notice_message}</p>
                        <h2 className="price">{priceWithCommas(pageData.data.price)}</h2>
                        <Buttons
                            text={button_add_to_card}
                            onClick={handleAddToCart}
                        />
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
                        pageData.data.images.map(({ id, url }) => (

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
                        pageData.data.relativeProducts.map(({ id, title, price, imgUrl }) => (

                            <Grid
                                key={id}
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
