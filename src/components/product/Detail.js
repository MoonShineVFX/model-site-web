import { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Grid, useMediaQuery } from '@mui/material';
import Buttons from '../Buttons';
import Images from '../Images';
import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import Service from '../../utils/util.service';
import useQuery from '../../utils/useQuery';
import useLocalStorage from '../../utils/useLocalStorage';
import useGoogleAnalytics from '../../utils/useGoogleAnalytics';

// dynamic
const OtherInfo = dynamic(() => import('./OtherInfo'));
const DetailWrapLayout = dynamic(
    () => import('./productLayout').then((mod) => mod.DetailWrapLayout),
    { ssr: false },
);
const DetailContentLayout = dynamic(
    () => import('./productLayout').then((mod) => mod.DetailContentLayout),
    { ssr: false },
);
const FormatAndRendererLayout = dynamic(
    () => import('./productLayout').then((mod) => mod.FormatAndRendererLayout),
    { ssr: false },
);

//
const {
    priceWithCommas,
    mappingTags,
    arrangeFormatAndRender,
} = util;

// 價格
const renderPrice = (price) => <h2 className="price">{priceWithCommas(price)}</h2>;

const Detail = ({ pageData }) => {

    // Hook
    const matches = useMediaQuery((theme)=> theme.breakpoints.down('mobile'));
    const eventTracker = useGoogleAnalytics();
    const [cartItem, setCartItem] = useLocalStorage('cartItem'); // 未登入狀態用 localStorage 存

    // Router
    const query = useQuery();

    // Context
    const {
        visible,
        currEvent,
        tags,
        deftags,
        globalDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {

        document.body.style.overflow = (visible && currEvent === 'viewImg') ? 'hidden' : '';

    });

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

    return  (

        <DetailWrapLayout>
            <div className="detail-banner">
                <Images
                    src={matches ? pageData.mobileImgUrl : pageData.imgUrl}
                    alt={pageData.title}
                    width="1200"
                    height="396"
                    isBlur
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
                        matches && renderPrice(pageData.price)
                    }

                    <p className="description">{pageData.description}</p>
                    <div className="format-and-renderer">
                        <div className="label">{deftags.product_detail_format_and_renderer}</div>
                        <FormatAndRendererLayout>
                            {
                                Object.keys(arrangeFormatAndRender(pageData.models)).map((id) => (

                                    <li
                                        key={id}
                                        className="item"
                                    >
                                        <h4 className="title">{arrangeFormatAndRender(pageData.models)[id].name}</h4>
                                        <span className="renders">
                                            <span>{deftags.product_render}: </span>
                                            {arrangeFormatAndRender(pageData.models)[id].renders.map(({ rendererName }) => rendererName).join('、')}
                                        </span>
                                    </li>

                                ))
                            }
                        </FormatAndRendererLayout>
                    </div>
                    <p className="notice">{deftags.product_detail_notice_message}</p>
                </Grid>

                <Grid
                    item
                    xs={12}
                    mobile={4}
                    className="grid-right"
                >
                    {
                        // mWeb
                        matches &&
                            <OtherInfo
                                modelSum={pageData.modelSum}
                                fileSize={pageData.fileSize}
                                perImgSize={pageData.perImgSize}
                            />
                    }

                    {
                        // Web
                        !matches && renderPrice(pageData.price)
                    }

                    <Buttons
                        text={deftags.btn_add_to_cart}
                        onClick={handleAddToCart}
                    />

                    {
                        // Web
                        !matches &&
                            <OtherInfo
                                modelSum={pageData.modelSum}
                                fileSize={pageData.fileSize}
                                perImgSize={pageData.perImgSize}
                            />
                    }
                </Grid>
            </DetailContentLayout>
        </DetailWrapLayout>

    );

};

export default Detail;
