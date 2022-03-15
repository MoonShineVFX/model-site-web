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

    const matches = useMediaQuery((theme) => theme.breakpoints.down('mobile'));

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
                                    newPage
                                >
                                    <img
                                        src={matches ? mobileImgUrl : imgUrl}
                                        alt={title}
                                        width={matches ? '436' : '840'}
                                        height={matches ? '606' : '386'}
                                    />
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
