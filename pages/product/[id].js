import { Fragment, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { productDetailStyles } from '../../src/components/product/productLayout';
import Head from '../../src/containers/Head';
import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';

// dynamic
const Detail = dynamic(() => import('../../src/components/product/Detail'));
const PreviewImage = dynamic(
    () => import('../../src/components/product/PreviewImage'),
    { ssr: false },
);
const RelativeProductItem = dynamic(
    () => import('../../src/components/product/RelativeProductItem'),
    { ssr: false },
);
const ImageEnlarge = dynamic(
    () => import('../../src/components/ImageEnlarge'),
    { ssr: false },
);

//
const ProductDetail = ({ langs, pageData }) => {

    // Context
    const {
        visible,
        currEvent,
        formStorageData,
        globalDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, [visible, currEvent, globalDispatch]);

    return (

        <Fragment>
            {productDetailStyles}
            <Head
                title={pageData.title}
                description={langs.og_description}
            />

            <Detail pageData={pageData} />

            <PreviewImage
                title={langs.product_detail_section_title01}
                showMore={false}
                data-section="preview-image"
                lists={pageData.previews}
            />

            {
                // Notes: 若無相關產品則不顯示
                !!pageData.relativeProducts.length &&
                    <RelativeProductItem
                        title={langs.product_detail_section_title02}
                        showMore={false}
                        lists={pageData.relativeProducts}
                    />
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

export async function getServerSideProps ({ res, params, locale }) {

    res.setHeader(
        'Cache-Control',
        'public, max-age=31536000, stale-while-revalidate=31536000, immutable'
    );

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
