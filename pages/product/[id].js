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

    return {
        props: {
            pageData: data.data,
        },
    };

}
