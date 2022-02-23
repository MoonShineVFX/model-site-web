import { useContext } from 'react';
import {
    BannerWrapLayout,
    SlideShowWrapLayout,
    SlideShowItemLayout,
    SlideshowInfoLayout,
} from './homeLayout';
import Links from '../Links';
import { GlobalContext } from '../../context/global.state';

const Banner = ({ pageData }) => {

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
                        detail,
                        imgUrl,
                        link,
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
                                        src={imgUrl}
                                        alt={title}
                                        width="840"
                                        height="386"
                                    />
                                </Links>

                                <SlideshowInfoLayout>
                                    <div dangerouslySetInnerHTML={{ __html: detail }} />
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
