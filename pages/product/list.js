import ProductBase from '../../src/components/product/ProductBase';
import { ProductProvider } from '../../src/context/product/product.state';

const ProductList = ({ pageData }) => (

    <ProductProvider>
        <ProductBase pageData={pageData} />
    </ProductProvider>

);

export default ProductList;

export async function getStaticProps () {

    // const res = await util.serviceServer('/json/product/home.json');
    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/product/list.json');
    const data = await res.json();

    if (!data.result) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
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
