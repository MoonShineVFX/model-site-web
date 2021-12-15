import util from './util';

const Service = {
    // common
    common: (reqData) => util.serviceProxy({
        url: '/common.json',
        method: 'get',
    }, reqData),

    // 商品
    productList: ({ page, type, tag }) => util.serviceProxy({
        method: 'get',
        url: `/product/list.json?page=${page}&type=${type}${tag ? `&tag=${tag}` : ''}`,
    }),

    // 訂單記錄
    orderRecord: (reqData) => util.serviceProxy('/member/order_record.json', reqData),

    // 訂單詳細
    orderItems: (reqData) => util.serviceProxy({
        method: 'get',
        url: '/member/cart.json',
    }, reqData),

    // 我的資料
    myAccount: (reqData) => util.serviceProxy('/member/my_account.json', reqData),
};

export default Service;
