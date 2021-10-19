import ProductDetailBase from '../../src/components/product/ProductDetailBase';
import { ProductProvider } from '../../src/context/product/product.state';
import utilConst from '../../src/utils/util.const';

const { revalidate } = utilConst;

//
const ProductDetail = ({ pageData }) => (

    <ProductProvider>
        <ProductDetailBase pageData={{ ...pageData }} />
    </ProductProvider>

);

export default ProductDetail;

export async function getStaticPaths () {

    // const res = await admin.serviceServer({ url: '/list' });
    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/product/list.json');
    const data = await res.json();
    const paths = data.data.product.map((obj) => ({
        params: { id: String(obj.id) },
    }));

    return { paths, fallback: false };

}

export async function getStaticProps ({ params }) {

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
            revalidate,
            pageData: {
                title: data.data.title,
                data: data.data,
            },
        },
    };

}
