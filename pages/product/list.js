import ProductListBase from '../../src/components/product/ProductListBase';
import { ProductProvider } from '../../src/context/product/product.state';
import utilConst from '../../src/utils/util.const';

const { revalidate } = utilConst;

//
const ProductList = ({ pageData }) => (

    <ProductProvider>
        <ProductListBase pageData={{ ...pageData }} />
    </ProductProvider>

);

export default ProductList;

export async function getServerSideProps ({ query }) {

    // const res = await model.serviceServer('/json/product/home.json');
    // const { data } = res;

    const { page, type, tag } = query;
    const res = await fetch(`http://localhost:1006/json/product/list.json?page=${page}&type=${type}${tag ? `&tag=${tag}` : ''}`);
    const data = await res.json();

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: {
                title: '商店',
                data: data.data,
            },
        },
    };

};
