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

    // 訂單詳細
    orderItems: (reqData) => util.serviceProxy({
        method: 'get',
        url: '/member/cart.json',
    }, reqData),
};

export default Service;
