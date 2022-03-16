import { useContext } from 'react';
import { useMediaQuery } from '@mui/material';
import {
    BannerWrapLayout,
    SlideShowWrapLayout,
    SlideShowItemLayout,
    SlideshowInfoLayout,
} from './homeLayout';
import Links from '../Links';
import { GlobalContext } from '../../context/global.state';

const Banner = ({ pageData }) => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('middle'));

    // Context
    const { slideshowActive } = useContext(GlobalContext);

    return (

        <BannerWrapLayout>
            <SlideShowWrapLayout
                data={pageData.banners}
                className="banner-wrap"
            >
                {
                    pageData.banners.map(({
                        id,
                        title,
                        description,
                        link,
                        imgUrl,
                        mobileImgUrl,
                    }, idx) => (

                        <SlideShowItemLayout
                            key={id}
                            className={`${(idx === slideshowActive) ? 'active' : 'hide'} item`}
                        >
                            <div className="inner">
                                <Links
                                    url={link}
                                    title={title}
                                    className="thumb"
                                    newPage
                                >
                                    {
                                        matches ? (

                                            <img
                                                src={mobileImgUrl}
                                                alt={title}
                                                width="436"
                                                height="606"
                                            />

                                        ) : (

                                            <img
                                                src={imgUrl}
                                                alt={title}
                                                width="840"
                                                height="386"
                                            />

                                        )
                                    }
                                </Links>

                                <SlideshowInfoLayout>
                                    <span className="flag">New</span>
                                    <h2 className="title">{title}</h2>
                                    <p className="description">{description}</p>
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
