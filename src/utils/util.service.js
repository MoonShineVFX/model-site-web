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

    userList: (reqData) => util.serviceProxy('/user/userList', reqData),
    updateAuthority: (reqData) => util.serviceProxy('/user/updateAuthority', reqData),
};

export default Service;
