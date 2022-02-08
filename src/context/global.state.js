import React, { createContext, useReducer } from 'react';
import useLocalStorage from '../utils/useLocalStorage';
import Service from '../utils/util.service';

import {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
} from './global.reducer';

// Global
const globalInitState = {
    page: '',
    tags: [],
    slideshowActive: 0,
    logged: false,
    cartCount: 0,
    targetBox: '',
    targetPopup: null,
    snackbar: false,
    cartItem: {},
};

// Form values
const formStorageInitState = {
    formStorageData: {},
};

// Lightbox
const lightboxInitState = {
    visible: false,
    currEvent: '',
};

// Create Context
const GlobalContext = createContext(null);

// Provider
const GlobalProvider = ({ children }) => {

    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitState);
    const [formStorageState, formStorageDispatch] = useReducer(formStorageReducer, formStorageInitState);
    const [lightboxState, lightboxDispatch] = useReducer(lightboxReducer, lightboxInitState);
    const {
        page,
        tags,
        slideshowActive,
        logged,
        cartCount,
        targetBox,
        targetPopup,
        snackbar,
        cartItem,
    } = globalState;

    const { formStorageData } = formStorageState;
    const { visible, currEvent } = lightboxState;
    const { Provider } = GlobalContext;

    // 取得全域資料
    const getGlobalData = () => {

        Service.common()
            .then((resData) => {

                const { tags, ...rest } = resData;
                globalDispatch({
                    type: 'global_data',
                    payload: {
                        tags,
                        other: rest,
                    },
                });

            });

    };

    // 更新購物車
    const updateCartItem = () => {

        // cartItem
        // reference: https://www.noumansaleem.com/reactjs/2020/07/26/custom-react-hooks-with-useReducer-to-simplify-state-handling.html
    };

    return (

        <Provider value={{
            // 全域資料
            page,
            tags,
            slideshowActive,
            logged,
            cartCount,
            targetBox,
            targetPopup,
            snackbar,
            cartItem,
            getGlobalData,
            updateCartItem,

            // Form 表單暫存
            formStorageData,

            // Lightbox
            visible,
            currEvent,

            // Dispatch
            globalDispatch,
            formStorageDispatch,
            lightboxDispatch,
        }}>
            {children}
        </Provider>

    );

};

export { GlobalContext, GlobalProvider };
