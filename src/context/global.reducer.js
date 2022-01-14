// Global
const globalReducer = (state, { type, payload }) => {

    switch (type) {
        case 'page':
            return {
                ...state,
                page: payload,
            };

        case 'slideshow':
            return {
                ...state,
                slideshowActive: payload,
            };

        case 'global_data':
            return {
                ...state,
                tags: payload.tags,
                user: payload.other,
                logged: !!payload.other.userId,
            };

        case 'add_cart':
            return {
                ...state,
                cartCount: payload,
            };

        case 'target_box':
            return {
                ...state,
                targetBox: payload,
            };

        case 'target_popup':
            return {
                ...state,
                targetPopup: payload,
            };

        default:
            return { ...state };
    }

};

// Form Fields
const formStorageReducer = (state, { type, payload }) => {

    switch (type) {
        case 'COLLECT':
            return {
                formStorageData: payload,
            };

        case 'CLEAR':
            return {
                formStorageData: {},
            };

        default:
            return state;
    }

};

// Lightbox
const lightboxReducer = (state, { type, currEvent }) => {

    switch (type) {
        case 'SHOW':
            return { visible: true, currEvent };

        case 'HIDE':
            return { visible: false, currEvent: '' };

        default:
            return { ...state, currEvent };
    }

};

export {
    globalReducer,
    formStorageReducer,
    lightboxReducer,
};
