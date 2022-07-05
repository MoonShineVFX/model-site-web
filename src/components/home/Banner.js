import { useContext } from 'react';
import { useMediaQuery } from '@mui/material';
import {
    BannerWrapLayout,
    SlideShowWrapLayout,
    SlideShowItemLayout,
    SlideshowInfoLayout,
} from './homeLayout';
import Links from '../Links';
import Images from '../Images';
import { GlobalContext } from '../../context/global.state';
import useGoogleAnalytics from '../../utils/useGoogleAnalytics';

const Banner = ({ lists }) => {

    // Context
    const { slideshowActive } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.down('middle'));
    const eventTracker = useGoogleAnalytics();

    return (

        <BannerWrapLayout>
            <SlideShowWrapLayout
                data={lists}
                className="banner-wrap"
            >
                {
                    lists.map(({
                        id,
                        productId,
                        title,
                        description,
                        imgUrl,
                        mobileImgUrl,
                    }, idx) => (

                        <SlideShowItemLayout
                            key={id}
                            className={`item ${(idx === slideshowActive) ? 'active' : 'hide'}`}
                            data-index={idx}
                        >
                            <div className="inner">
                                <Links
                                    url={`/product/${productId}`}
                                    title={title}
                                    className="thumb"
                                    newPage
                                    onClick={() => eventTracker({
                                        category: title,
                                        action: `點擊商品 id_${id}`,
                                        label: 'Banner',
                                    })}
                                >
                                    {
                                        matches ? (

                                            <Images
                                                src={mobileImgUrl}
                                                alt={title}
                                                width="436"
                                                height="606"
                                            />

                                        ) : (

                                            <Images
                                                src={imgUrl}
                                                alt={title}
                                                width="840"
                                                height="386"
                                                isBlur
                                            />

                                        )
                                    }
                                </Links>

                                <SlideshowInfoLayout className="slideshow-info-wrap">
                                    <span className="flag">New</span>
                                    <h2 className="title">{title}</h2>
                                    <p className="description web-line-clamp" title={description}>{description}</p>
                                </SlideshowInfoLayout>
                            </div>
                        </SlideShowItemLayout>

                    ))
                }
            </SlideShowWrapLayout>
        </BannerWrapLayout>

    );

};

export default Banner;
