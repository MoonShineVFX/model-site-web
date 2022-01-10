import ProductListBase from '../../src/components/product/ProductListBase';
import { ProductProvider } from '../../src/context/product/product.state';
import util from '../../src/utils/util';

//
const ProductList = ({ pageData }) => (

    <ProductProvider>
        <ProductListBase pageData={{ ...pageData }} />
    </ProductProvider>

);

export default ProductList;

export async function getServerSideProps ({ query }) {

    const resData = await util.serviceServer({
        method: 'get',
        url: `/products?page=${query.page}&type=${query.type}${query.tags ? `&tags=${query.tags}` : ''}`,
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

};
