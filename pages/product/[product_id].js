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

    console.log('params:', params)

    const resData = await util.serviceServer({
        method: 'get',
        url: `/web_products/${+params.product_id}`,
    });

    const { data } = resData;

    // const res = await fetch('http://localhost:1006/json/product/51654.json');
    // const data = await res.json();

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
