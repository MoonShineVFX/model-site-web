import util from './util';

const Service = {
    // common
    common: (reqData) => util.serviceProxy('/common', reqData),

    // 未登入 (註冊、登入、忘記密碼、重設密碼)
    signin: ({ reqData, headers }) => util.serviceProxy('/login', reqData, {
        headers: { ...headers },
    }),
    register: (reqData) => util.serviceProxy('/register', reqData),
    forgotPassword: (reqData) => util.serviceProxy('/forget_password', reqData),
    resetPassword: (reqData) => util.serviceProxy('/reset_password', reqData),

    // 購物車
    cartAdd: (reqData) => util.serviceProxy('/cart_product_add', reqData),
    cartRemove: (reqData) => util.serviceProxy('/cart_product_remove', reqData),

    // 付款
    order: (reqData) => util.serviceProxy('/order_create', reqData),

    // 訂單記錄
    orderRecord: (reqData) => util.serviceProxy('/orders', reqData),

    // 我的資料
    myAccount: (reqData) => util.serviceProxy('/my_account', reqData),
    updateMyAccount: (reqData) => util.serviceProxy('/account_update', reqData),

    // 取得下載連結
    donwloadLink: (reqData) => util.serviceProxy('/model_download_link', reqData),

    // 其他
    privacy: (reqData) => util.serviceProxy('/???', reqData),
};

export default Service;
