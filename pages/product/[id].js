import ProductDetailBase from '../../src/components/product/ProductDetailBase';
import { ProductProvider } from '../../src/context/product/product.state';
import util from '../../src/utils/util';

const ProductDetail = ({ pageData }) => (

    <ProductProvider>
        <ProductDetailBase pageData={{ ...pageData }} />
    </ProductProvider>

);

export default ProductDetail;

export async function getServerSideProps ({ params }) {

    const resData = await util.serviceServer({
        method: 'get',
        url: `/products/${params.id}`,
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
                destination: '/product/list?page=1&type=all',
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
