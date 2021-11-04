import ProductDetailBase from '../../src/components/product/ProductDetailBase';
import { ProductProvider } from '../../src/context/product/product.state';

const ProductDetail = ({ pageData }) => (

    <ProductProvider>
        <ProductDetailBase pageData={{ ...pageData }} />
    </ProductProvider>

);

export default ProductDetail;

export async function getServerSideProps ({ params }) {

    // const res = await admin.serviceServer({
    //     method: 'get',
    //     url: `/news/${params.id}`,
    // });

    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/product/51654.json');
    const data = await res.json();

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: {
                title: data.data.title,
                data: data.data,
            },
        },
    };

}
