import util from './util';

const Service = {
    // common
    common: (reqData) => util.serviceProxy('/common', reqData),

    // 未登入
    signin: ({ reqData, headers }) => util.serviceProxy('/login', reqData, {
        headers: { ...headers },
    }),
    register: (reqData) => util.serviceProxy('/register', reqData),

    // 商品
    productList: ({ page, type, tag }) => util.serviceProxy({
        method: 'get',
        url: `/product/list.json?page=${page}&type=${type}${tag ? `&tag=${tag}` : ''}`,
    }),

    // 購物車
    cartAdd: (reqData) => util.serviceProxy('/cart_product_add', reqData),

    // 訂單記錄
    orderRecord: (reqData) => util.serviceProxy('/member/order_record.json', reqData),

    // 訂單詳細
    orderItems: (reqData) => util.serviceProxy({
        method: 'get',
        url: '/member/cart.json',
    }, reqData),

    // 我的資料
    myAccount: (reqData) => util.serviceProxy('/member/my_account.json', reqData),

    // 取得下載連結
    donwloadLink: (reqData) => util.serviceProxy('/member/downloadLink.json', reqData),
};

export default Service;
