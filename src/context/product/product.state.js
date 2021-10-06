import { createContext, useContext, useReducer } from 'react';
import { productReducer } from './product.reducer';
// import Prompt from '../../components/Prompt';
import { GlobalContext } from '../global.state';
import Service from '../../utils/model.service';

// Init
const initState = {
    action: false,
    lists: [],
};

// Create Context
const ProductContext = createContext(null);

// Provider
const ProductProvider = ({ children }) => {

    // Context
    const {
        lightboxDispatch,
        formStorageDispatch,
    } = useContext(GlobalContext);

    const [productState, productDispatch] = useReducer(productReducer, initState);

    const {
        action,
        lists,
    } = productState;

    const { Provider } = ProductContext;

    // 列表
    const productList = (reqData) => {

        Service.productList(reqData)
            .then((resData) => {

                productDispatch({ type: 'product_list', payload: { resData, action: true } });

            });

    };

    // 新增
    const productCreate = (reqData) => {

        // Fake
        const resData = {
            "id": '81344',
            "imgUrl": "//fakeimg.pl/200x150",
            "link": "http://google.com.tw",
            "name": "Create-81344",
            "phone": "02-11111111",
            "email": "service@xxx.com",
            "description": "Create-81344",
            "tag": ["4546", "4544"]
        };

        lightboxDispatch({ type: 'HIDE' });
        formStorageDispatch({ type: 'CLEAR' });
        productDispatch({ type: 'partner_create', payload: { resData, action: true } });

        // Debug
        return;
        Service.productCreate(reqData)
            .then((resData) => {

                lightboxDispatch({ type: 'HIDE' });
                // Prompt('success', {
                //     callback: () => {

                //         formStorageDispatch({ type: 'CLEAR' });
                //         productDispatch({ type: 'partner_create', payload: { resData, action: true } });

                //     },
                // });

            });

    };

    return (

        <Provider value={{
            action,
            lists,

            productList,
            productCreate,

            // Dispatch
            productDispatch,
        }}>
            {children}
        </Provider>
    );

};

export { ProductProvider, ProductContext };
