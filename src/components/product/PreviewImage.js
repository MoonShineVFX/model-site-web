import { useContext } from 'react';
import { Grid } from '@mui/material';
import { PreviewImageWrapLayout, DemoImageLayout } from './productLayout';
import { GlobalContext } from '../../context/global.state';

const PreviewImage = ({ lists, ...rest }) => {

    // Context
    const { formStorageDispatch, lightboxDispatch } = useContext(GlobalContext);

    // 點圖放大
    const handleClickImgEnlarge = (url, id) => {

        lightboxDispatch({ type: 'SHOW', currEvent: 'viewImg' });
        formStorageDispatch({
            type: 'COLLECT',
            payload: { id, imgUrl: url },
        });

    };

    return (

        <PreviewImageWrapLayout {...rest} >
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
                    lists.map(({ id, url }, idx) => (

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
        </PreviewImageWrapLayout>

    );

};

export default PreviewImage;
